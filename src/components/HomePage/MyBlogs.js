import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";

function MyBlogs(props) {

    let navigate = useNavigate();
    const [blogsInOrder, setBlogsInOrder] = useState([]);
    // sort blogs in order
    useEffect(() => {
        setBlogsInOrder(props.blogs.sort((a, b) => b.key - a.key));
    }, [])

    return (
        <div className="myblogs">
            <h1 className="myblogs-title">Discover More Blogs</h1>
            <div className="myblogs-box">
                {blogsInOrder.slice(1, 7).map((blog) => {
                    return (
                        <div className="myblogs-box-box" key={blog.id}>
                            <h2 className="myblogs-box-title">{blog.title}</h2>
                            <button className="myblogs-box-button" onClick={() => {
                                navigate(`/blog/${blog.id}`);
                            }}>Read More</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyBlogs;