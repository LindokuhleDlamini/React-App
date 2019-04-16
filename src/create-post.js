import React, { Component } from 'react';
import PostService from './post-service.js';

class CreatePost extends Component {
    state = {
        responseToPost: ''
    }

    handleSubmit = async event => {
        event.preventDefault();
        var post = {
          author: this.refs.author.value,
          title: this.refs.title.value,
          content: this.refs.content.value,
          tags: this.refs.tags.value
        };
    
        this.setState({ responseToPost: PostService.createPost(post) });
    };

    render() {
        return (
        <div className="createPost">
            <form onSubmit= {this.handleSubmit}>
            Author:
            <input
                type = "text"
                ref= "author"
            /> <br/>
            Title:
            <input
                type= "text"
                ref = "title"
            /> <br/>
            Content:
            <input
                type= "text"
                ref = "content"
            /> <br/>
            Tags:
            <input
                type= "text"
                ref = "tags"
            /><br/>
            <input type="submit" value="Submit"></input>
            </form>
            <p>
                {this.state.responseToPost}
            </p>
        </div>
        );
        
    };
}

export default CreatePost;