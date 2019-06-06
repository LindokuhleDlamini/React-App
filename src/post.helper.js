const RemoveTags = (body) => {
    return(body.replace(/<p>/g, "").replace(/<p>/g, ""));
};

export default RemoveTags;