import React from "react";

function Hero(props)  {

    let heroBlog = props.blogs.find(o => o.key === props.blogNumber);

    // console.log(heroBlog);

    return (
        <div className="hero">
            <h1 className="hero-title">{heroBlog.title}</h1>
            <p className="hero-desc">{heroBlog.content}</p>
            <button className="hero-button" onClick={props.navigateToHeroBlog}>Read More</button>
        </div>
    )
}

export default Hero;