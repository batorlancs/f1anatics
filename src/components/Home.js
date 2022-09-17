import React from "react";
import { analytics } from "../Firebase";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router-dom";
import BlogList from "./HomePage/BlogList";
import Hero from "./HomePage/Hero";
function Home(props) {

    const {blogs, blogNumber} = props;

    let navigate = useNavigate();

    function blogClick() {
        logEvent(analytics, "blog click");
    }

    function navigateToHeroBlog() {
        let heroBlog = props.blogs.find(o => o.key === props.blogNumber);
        navigate(`/blog/${heroBlog.id}`);
    }

    return (
        <div>
            {blogs.length > 0 && <Hero blogs={blogs} blogNumber={blogNumber} navigateToHeroBlog={navigateToHeroBlog} blogClick={blogClick}/>}
            {blogs.length > 0 && <BlogList blogs={blogs} blogClick={blogClick}/>}
        </div>
    )
}

export default Home;