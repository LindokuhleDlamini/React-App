import React, { Component } from 'react';
import PostService from './post-service.js';
import CreatePost from './create-post.js';
import './App.css';

class App extends Component {
  state = {
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

  componentDidMount() {
    PostService.getPosts()
    .then(res => this.setState({ posts: res}))
    .catch(err => console.log(err));
  };

  viewPost = async event => {
    PostService.getPost(event.target.id)
    .then(res => this.setState({post: res}))
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
      body.push(<p>{posts[x].body.slice(0, 110)+ '...'}</p>);
      links.push(<button id = {posts[x]._id} onClick={this.viewPost}>View</button>);
    }

    for(let i = 0; i < posts.length; i++) {
      postContent.push(<div id={posts[i]._id}>{headers[i]}{body[i]}{links[i]}</div>)
    }
    return postContent;
  };

  render() {
    return (
      <div className="App">
        {this.createPostContent()}
        {<CreatePost />}
      </div>
    );
  }
}

export default App;
