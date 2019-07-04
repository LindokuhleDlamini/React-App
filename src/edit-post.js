import React from 'react';
import PostService from './post-service.js';

const EditPost = (props) => {
    return (
        <div className="editPost">
            <form id={props.post._id} onSubmit={submitEditedPost}>
                <label>Author:</label>
                <input type="text" name="Author" defaultValue={props.post.author}/>
                <br/>
                <label>Title:</label>
                <input type="text" name="Title" defaultValue={props.post.title}/>
                <br/>
                <label>Content:</label>
                <input type="text" name="Content" defaultValue={props.post.body}/>
                <br/>
                <label>Tags:</label>
                <input type="text" name="Tags" defaultValue={props.post.tags.join(", ")}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

const submitEditedPost = (event) => {
    event.preventDefault();
    const postId = event.target.id;
    const editedPost = {
        author: event.target.children.Author.value,
        title: event.target.children.Title.value,
        content: event.target.children.Content.value,
        tags: event.target.children.Tags.value,
    }

    PostService.updatePost(postId, editedPost)
    .then((res) => {
        alert(`Post ${res._id} has been updated`);
        window.location = 'index.js'
    })
}

export default EditPost;
