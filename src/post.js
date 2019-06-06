import React from 'react';
import RemoveTags from './post.helper.js';

const Post = (prop) => {
    return(
      <div>
          <h4>{prop.post.title}</h4>
          <div>{RemoveTags(prop.post.body)}</div>
      </div>
    )
};

export default Post;
