import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import HeroPic from "../../pic/hero.jpg";
import "./BlogList.css";


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
                {/* big */}
                {blogsInOrder.slice(1, 2).map((blog) => {
                    return (
                        <div className="bloglist-cont-box" key={blog.id}>
                            <div className="bloglist-cont-horz">
                                <div className="bloglist-cont-picbox">
                                    <img className="bloglist-cont-pic" src={blog.mainImg}></img>
                                </div>
                                <div className="bloglist-cont-vert">
                                    <h2 className="bloglist-cont-title">{blog.title}</h2>
                                    <p className="bloglist-cont-desc">{blog.desc}</p>
                                    <button className="bloglist-cont-button" onClick={() => {
                                        navigate(`/blog/${blog.id}`);
                                    }}>read more</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* right aligned */}
                {blogsInOrder.slice(2, 3).map((blog) => {
                    return (
                        <div className="bloglist-cont-box" key={blog.id}>
                            <div className="bloglist-cont-horz-even">
                                <div className="bloglist-cont-vert-even">
                                    <h2 className="bloglist-cont-title">{blog.title}</h2>
                                    <p className="bloglist-cont-desc">{blog.desc}</p>
                                    <button className="bloglist-cont-button" onClick={() => {
                                        navigate(`/blog/${blog.id}`);
                                    }}>read more</button>
                                </div>
                                <div className="bloglist-cont-picbox">
                                    <img className="bloglist-cont-pic" src={blog.mainImg}></img>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* left aligned */}
                {blogsInOrder.slice(3, 4).map((blog) => {
                    return (
                        <div className="bloglist-cont-box" key={blog.id}>
                            <div className="bloglist-cont-horz">
                                <div className="bloglist-cont-picbox">
                                    <img className="bloglist-cont-pic" src={blog.mainImg}></img>
                                </div>
                                <div className="bloglist-cont-vert">
                                    <h2 className="bloglist-cont-title">{blog.title}</h2>
                                    <p className="bloglist-cont-desc">{blog.desc}</p>
                                    <button className="bloglist-cont-button" onClick={() => {
                                        navigate(`/blog/${blog.id}`);
                                    }}>read more</button>
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