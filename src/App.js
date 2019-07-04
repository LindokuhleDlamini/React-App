import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PostService from './post-service.js';
import CreatePost from './create-post.js';
import EditPost from './edit-post.js';
import Post from './post.js';
import Posts from './posts.js';
import './App.css';

class App extends Component {

  constructor() {
    super();
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
      }
    };
  }

  componentDidMount() {
    PostService.getPosts()
    .then(res => this.setState({ posts: res}))
    .catch(err => console.log(err));
  };

  getPost = async (event) => {
    PostService.getPost(event.target.id)
    .then(res => {
      this.setState({
        post: res
      })
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
        <Router>
          <div className="App">
            <ul>
              <li>
                <Link to="/" exact="true" >Home</Link>
              </li>
              <li>
                <Link to="/create" exact="true" >Create</Link>
              </li>
              <li>
                <Link to="/posts" exact="true" >Posts</Link>
              </li>
            </ul>
            
            <Route path="/" exact strict render={() => {
              return (<h1>Welcome</h1>);
            }}/>
            <Route path="/create" exact strict component={CreatePost}></Route>

            <Route path="/posts" exact strict render={() => {
              return (<Posts posts={this.state.posts} handler={this.getPost} />)
            }}></Route>

            <Route path="/edit" exact strict render={() => {
              return (<EditPost post={this.state.post}/>);
            }} ></Route>

            <Route path="/post" exact strict render={() => {
              return (<Post post={this.state.post} />)
            }}></Route>

          </div>
        </Router>
    )
  }
}

export default App;
