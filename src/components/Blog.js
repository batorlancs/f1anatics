import React from "react";

function Blog(props) {

    const {blogid, blogdata} = props;

    return (
        <div>
            <h1>{blogdata.title}</h1>
        </div>
    )
}

export default Blog;