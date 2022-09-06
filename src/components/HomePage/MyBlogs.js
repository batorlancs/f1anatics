import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import HeroPic from "../../pic/hero.jpg";
import "./MyBlogs.css";


function MyBlogs(props) {

    let navigate = useNavigate();
    const [blogsInOrder, setBlogsInOrder] = useState([]);
    // sort blogs in order
    useEffect(() => {
        setBlogsInOrder(props.blogs.sort((a, b) => b.key - a.key));
    }, [])

    return (
        <div className="myblogs">
            <h2 className="myblogs-title">Recent articles</h2>
            <hr/>
            <div className="myblogs-cont">
                {blogsInOrder.slice(1, 2).map((blog) => {
                    return (
                        <div className="myblogs-cont-box" key={blog.id}>
                            <div className="myblogs-cont-horz">
                                <div className="myblogs-cont-picbox">
                                    <img className="myblogs-cont-pic" src={HeroPic}></img>
                                </div>
                                <div className="myblogs-cont-vert">
                                    <h2 className="myblogs-cont-number">01.</h2>
                                    <h2 className="myblogs-cont-title">{blog.title}</h2>
                                    <p className="myblogs-cont-desc">{blog.content}</p>
                                    <button className="myblogs-cont-button" onClick={() => {
                                        navigate(`/blog/${blog.id}`);
                                    }}>read more</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="myblogs-cont-even">
                {blogsInOrder.slice(2, 3).map((blog) => {
                    return (
                        <div className="myblogs-cont-box" key={blog.id}>
                            <div className="myblogs-cont-horz">
                                <div className="myblogs-cont-vert-even">
                                    <h2 className="myblogs-cont-number">02.</h2>
                                    <h2 className="myblogs-cont-title">{blog.title}</h2>
                                    <p className="myblogs-cont-desc-even">{blog.content}</p>
                                    <button className="myblogs-cont-button-even" onClick={() => {
                                        navigate(`/blog/${blog.id}`);
                                    }}>read more</button>
                                </div>
                                <div className="myblogs-cont-picbox-even">
                                    <img className="myblogs-cont-pic" src={HeroPic}></img>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="myblogs-cont">
                {blogsInOrder.slice(3, 4).map((blog) => {
                    return (
                        <div className="myblogs-cont-box" key={blog.id}>
                            <div className="myblogs-cont-horz">
                                <div className="myblogs-cont-picbox">
                                    <img className="myblogs-cont-pic" src={HeroPic}></img>
                                </div>
                                <div className="myblogs-cont-vert">
                                    <h2 className="myblogs-cont-number">03.</h2>
                                    <h2 className="myblogs-cont-title">{blog.title}</h2>
                                    <p className="myblogs-cont-desc">{blog.content}</p>
                                    <button className="myblogs-cont-button" onClick={() => {
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

export default MyBlogs;