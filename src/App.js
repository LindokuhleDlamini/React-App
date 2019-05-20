import React, { Component } from 'react';
import PostService from './post-service.js';
import CreatePost from './create-post.js';
import Post from './post.js';
import './App.css';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';

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
  

  getPosts = async => {
    PostService.getPosts()
    .then(res => this.setState({ posts: res}))
    .catch(err => console.log(err));
  }

  getPost = async (event) => {
    PostService.getPost(event.target.id)
    .then(res => this.setState({post: res}))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPosts();
  };


  removeTags = (body) => {
    return(body.replace("<p>", "").replace("</p>", ""));
  };

  createPostContent = () => {
    let posts = this.state.posts;
    let postContent = [];
    let headers = [];
    let body = [];
    let links = [];

    for(let x = 0; x < posts.length; x++) {
      headers.push(<h4>{posts[x].title} by {posts[x].author} on {posts[x].date}</h4>);
      body.push(<p>{this.removeTags(posts[x].body).slice(0, 110) + '...'}</p>);
      links.push(<NavLink  to="/post" id = {posts[x]._id} onClick={this.getPost.bind(this)}>View</NavLink>);
    }

    for(let i = 0; i < posts.length; i++) {
      postContent.push(<div key={posts[i]._id}>{headers[i]}{body[i]}{links[i]}</div>);
    }
    return postContent;
  };

  render() {
    console.log("Render");
    console.log(this.state);
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

            {/* <Route path="/post" exact strict component = {Post(this.state.post)}/> */}

            <Route path="/post" exact strict render={(routeProps) => (<Post {...routeProps} post={this.state.post} />)}/>
          </div>
        </Router>
    )
  }
}

export default App;
