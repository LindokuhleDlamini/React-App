import React from 'react';
import PostService from './post-service.js';

const CreatePost = () => {
    return (
        <div className="createPost">
            <form onSubmit={handleSubmit}>
                <label>Author:</label>
                <input type = "text" name="Author"/>
                <br/>
                <label>Title:</label>
                <input type= "text" name="Title"/>
                <br/>
                <label>Content:</label>
                <input type= "text" name="Content"/>
                <br/>
                <label>Tags:</label>
                <input type= "text" name="Tags"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

const handleSubmit = (event) => {
    event.preventDefault();
    var post = {
        author: event.target.children.Author.value,
        title: event.target.children.Title.value,
        content: event.target.children.Content.value,
        tags: event.target.children.Tags.value
    };
    reset(event);
    
    PostService.createPost(post)
    .then((res) => {
        alert(`New Post ${res.title} has been created by ${res.author}`);
    });
}

const reset = (event) => {
    event.target.children.Author.value = "";
    event.target.children.Title.value = "";
    event.target.children.Content.value = "";
    event.target.children.Tags.value = "";
}

export default CreatePost;
