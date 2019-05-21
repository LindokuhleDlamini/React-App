import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import PostService from './post-service.js';
import CreatePost from './create-post.js';
import './App.css';

const removeTags = (body) => {
  return(body.replace(/<p>/g, "").replace(/<p>/g, ""));
};

const Post = (prop) => {
  return(
    <div>
        <h4>{prop.post.title}</h4>
        <div>{removeTags(prop.post.body)}</div>
    </div>
  )
};

class App extends Component {

  constructor() {
    super()
    this.state = {
      posts: [],
      post: {
        author: '',
        body: '',
        comments:[],
        date: '',
        permalink: '',
        tags: [],
        title: '',
      },
    };
  }

  getPost = async (event) => {
    PostService.getPost(event.target.id)
    .then(res => this.setState({post: res}))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    PostService.getPosts()
    .then(res => this.setState({ posts: res}))
    .catch(err => console.log(err));
  };

  createPostContent = () => {
    let posts = this.state.posts;
    let postContent = [];
    let headers = [];
    let body = [];
    let links = [];

    for(let x = 0; x < posts.length; x++) {
      headers.push(<h4>{posts[x].title} by {posts[x].author} on {posts[x].date}</h4>);
      body.push(<p>{removeTags(posts[x].body.slice(0, 110)) + '...'}</p>);
      links.push(<NavLink  to="/post" id = {posts[x]._id} onClick={this.getPost.bind(this)}>View</NavLink>);
    }

    for(let i = 0; i < posts.length; i++) {
      postContent.push(<div key={posts[i]._id}>{headers[i]}{body[i]}{links[i]}</div>);
    }
    return postContent;
  };

  render() {
    return (
        <Router>
          <div className="App">
            <ul>
              <li>
              <NavLink to="/" exact >Home</NavLink>
              </li>
              <li>
              <NavLink to="/create" exact >Create</NavLink>
              </li>
              <li>
              <NavLink to="/posts" exact >Posts</NavLink>
              </li>
            </ul>
            
            <Route path="/" exact strict render={() => {
              return (<h1>Welcome</h1>);
            }}/>

            <Route path="/create" exact strict component={CreatePost}/>

            <Route path="/posts" exact strict render={() => {
              return this.createPostContent();
            }}/>

            <Route path="/post" exact strict render={() => {
              return (<Post post={this.state.post} />)
            }}/>

          </div>
        </Router>
    )
  }
}

export default App;
