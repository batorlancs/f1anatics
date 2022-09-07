import React from "react";
import "./Blog.css";
import Header from "./Header/Header";

function Blog(props) {

    const {blogid, blogdata} = props;

    return (
        <div className="blog">
            <Header />
            <div className="blog-mainimgbox">
                <div className="blog-mainimgbox-cont">
                    <h1 className="blog-title">{blogdata.title}</h1>
                    <h3 className="blog-date">
                        {blogdata.date.year}.
                        {blogdata.date.month > 10 ? blogdata.date.month : `0${blogdata.date.month}`}.
                        {blogdata.date.day > 10 ? blogdata.date.day : `0${blogdata.date.day}`}.
                    </h3>
                </div>
                <img className="blog-mainimg" src={blogdata.mainImg}></img>
            </div>
            <div className="blog-contentbox">
                
                
                <div className="blog-content">{blogdata.content.split("\n").map((par) => {
                    return (
                        <div className="blog-text">
                            <p>{par}</p>
                            <br></br>
                        </div>    
                    )
                })}</div>
                <div className="blog-secimgbox">
                    <img className="blog-secimg" src={blogdata.secImg}></img>
                </div>
                <div className="blog-content">{blogdata.content2.split("\n").map((par) => {
                    return (
                        <div className="blog-text">
                            <p>{par}</p>
                            <br></br>
                        </div>    
                    )
                })}</div>
                <h2 className="blog-name"><span>written by </span>{blogdata.name}</h2>
            </div>
            
        </div>
    )
}

export default Blog;