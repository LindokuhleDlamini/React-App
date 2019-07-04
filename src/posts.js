import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import RemoveTags from './post.helper.js';
import './App.css';

const Posts = (props) => {
    return (
        getPosts(props)
    );
};

const getPosts = (props) => {
    let posts = [];

    props.posts.map((post) => {
        posts.push(
            <div key={post._id}>
                {getPostHeader(post)}
                {getPostBody(post)}
                {getPostLink(post, props.handler)}
            </div>
        );
    });

    return posts;
};

const getPostHeader = (post) => {
    Moment.locale('en');
    return (
        <h4>{post.title} by {post.author} on {Moment(post.date).format('LLLL')}</h4>
    );
};

const getPostBody = (post) => {
    return(
        <p>{RemoveTags(post.body.slice(0, 110)) + '...'}</p>
    );
};

const getPostLink = (post, clickHandler) => {
    return(
        <div>
            <Link to='/post' id={post._id} onClick={clickHandler.bind(this)}>View</Link><br />
            <Link to='/edit' id={post._id} onClick={clickHandler.bind(this)}>Edit</Link>
        </div>
    );
};

export default Posts;
