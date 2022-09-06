import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import MyBlogs from "./HomePage/MyBlogs";
import BlogList from "./HomePage/BlogList";
import Hero from "./HomePage/Hero";
import About from "./HomePage/About";
import Header from "./Header/Header";

function Home(props) {

    const {blogs, blogNumber} = props;

    let navigate = useNavigate();

    function navigateToHeroBlog() {
        let heroBlog = props.blogs.find(o => o.key === props.blogNumber);
        navigate(`/blog/${heroBlog.id}`);
    }

    return (
        <div>
            <Header />
            {blogs.length > 0 && <Hero blogs={blogs} blogNumber={blogNumber} navigateToHeroBlog={navigateToHeroBlog}/>}
            {/* {blogs.length > 0 && <MyBlogs blogs={blogs}/>} */}
            {blogs.length > 0 && <BlogList blogs={blogs}/>}
            {/* <About /> */}
        </div>
    )
}

export default Home;