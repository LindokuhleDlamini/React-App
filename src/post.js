import React, { Component } from 'react';


class Post extends Component {

    state = {
        post: {}
    }

    constructor(props) {
        debugger;
        super(props);
        this.state = {
            post: props
        }
    }

    removeTags = (body) => {
        return(body.replace("<p>", "").replace("</p>", ""));
      };


    render() {

        return (
            <div>
                <h4>{this.state.post.title}</h4>
                <div>{this.state.post.body}</div>
            </div>
        )
    }
}

export default Post;