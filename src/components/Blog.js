import React from "react";
import "./Blog.css";
import Comments from "./Comments/Comments";

// --------------------------------------------------------------------------------------------------------------------------------
// Blog page (Showing individual blogs)
// --------------------------------------------------------------------------------------------------------------------------------

function Blog(props) {

    const {blogdata} = props;

    return (
        <div className="blog">
            <div className="blog-mainimgbox">
                <div className="blog-mainimgbox-cont">
                    <h1 className="blog-title">{blogdata.title}</h1>
                    <h3 className="blog-date">
                        {blogdata.date.year}.
                        {blogdata.date.month >= 10 ? blogdata.date.month : `0${blogdata.date.month}`}.
                        {blogdata.date.day >= 10 ? blogdata.date.day : `0${blogdata.date.day}`}.
                    </h3>
                </div>
                <img className="blog-mainimg" src={blogdata.mainImg} alt="blog_main_image"></img>
            </div>
            <div className="blog-contentbox">
                { blogdata.content &&
                <div className="blog-editor" dangerouslySetInnerHTML={{__html: blogdata.content}}></div> }
                { !blogdata.hideSecImg &&
                <div className="blog-secimgbox">
                    <img className="blog-secimg" src={blogdata.secImg} alt="blog_secondary_image"></img>
                </div> }
                { blogdata.content2 &&
                <div className="blog-editor" dangerouslySetInnerHTML={{__html: blogdata.content2}}></div> }
                <h2 className="blog-name"><span>Written by </span>{blogdata.name}</h2>
                <Comments blogid={blogdata.id} calcPosted={props.calcPosted}/>
            </div>
        </div>
    )
}

export default Blog;