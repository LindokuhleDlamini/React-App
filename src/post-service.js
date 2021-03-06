
const PostService = {
    getPosts: async function () {
        const response = await fetch('/posts');
        const body = await response.json();
    
        if(response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    },

    getPost: async function (id) {
        const response = await fetch(`/post/${id}`);
        const body = await response.json();
    
        if(response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    },

    createPost: async function (post) {
        const response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                author: post.author,
                title: post.title,
                content: post.content,
                tags: post.tags
            }),
        });
        const body = await response.json();
    
        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    },

    updatePost: async function (id, post) {
        const response = await fetch(`/post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post),
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    },
};

export default PostService;
