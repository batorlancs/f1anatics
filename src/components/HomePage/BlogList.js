import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import ArrowIcon from "../../pic/closeicon.svg";
import "./BlogList.css";

// --------------------------------------------------------------------------------------------------------------------------------
// Blog List page to show the 2nd, 3rd, 4th most recent post in a list
// --------------------------------------------------------------------------------------------------------------------------------

function BlogList(props) {

    let navigate = useNavigate();
    const [blogsInOrder, setBlogsInOrder] = useState([]);

    // sort blogs in order
    useEffect(() => {
        setBlogsInOrder(props.blogs.sort((a, b) => b.key - a.key));
    }, [])

    return (
        <div className="bloglist">
            <div className="bloglist-cont">
                {blogsInOrder.slice(1, 4).map((blog) => {
                    return (
                        <div className="bloglist-cont-box" key={blog.id}>
                            <div className="bloglist-cont-horz">
                                <div className="bloglist-cont-picbox">
                                    <img className="bloglist-cont-pic" src={blog.mainImg} alt="blog_card_image"></img>
                                </div>
                                <div className="bloglist-cont-vert">
                                    <h2 className="bloglist-cont-title">{blog.title}</h2>
                                    <p className="bloglist-cont-desc">{blog.desc}</p>
                                    <button className="bloglist-cont-button" onClick={() => {
                                        navigate(`/blog/${blog.id}`);
                                        props.blogClick();
                                    }}>Read more
                                    <img className="hero-button-arrow" src={ArrowIcon} alt="button_arrow_icon"></img></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BlogList;