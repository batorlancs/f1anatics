import React, { useState, useEffect } from "react";
import "./Hero.css";
import ArrowIcon from "../../pic/closeicon.svg";

function Hero(props)  {

    let heroBlog = props.blogs.find(o => o.key === props.blogNumber);

    const [ago, setAgo] = useState("");

    useEffect(() => {
        setAgo(props.calcPosted(heroBlog.date.time));
    }, [])

    return (
        <div className="hero">
            <div className="hero-box">
                <h1 className="hero-title">{heroBlog.title}</h1>
                <div className="hero-box-cont">
                    <p className="hero-buttondesc">{heroBlog.desc}</p>
                    <button className="hero-button" onClick={() => {
                        props.navigateToHeroBlog();
                        props.blogClick();
                    }}>Read more
                    <img className="hero-button-arrow" src={ArrowIcon}></img></button>
                </div>
            </div>
            <div className="hero-picbox">
                <img className="hero-pic1" src={heroBlog.mainImg} alt="hero_main_image"></img>
                <div className="hero-pic2box">
                    <img className="hero-pic2" src={heroBlog.secImg} alt="hero_secondary_image"></img>
                </div>
            </div>
            
            <p className="hero-desc">Posted {ago}</p>
            <div className="hero-back"></div>
        </div>
    )
}

export default Hero;