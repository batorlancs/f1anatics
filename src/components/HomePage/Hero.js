import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero(props)  {

    let heroBlog = props.blogs.find(o => o.key === props.blogNumber);

    const [ago, setAgo] = useState("");

    useEffect(() => {
        var today = new Date().getTime();
        var diff = (today - heroBlog.date.time) / 1000;
        if (diff < 60) {
            setAgo("less then a minute ago");
        } else if (diff < 3600) {
            diff /= 60;
            Math.floor(diff) === 1 ?
            setAgo(`${Math.floor(diff)} minute ago`) :
            setAgo(`${Math.floor(diff)} minutes ago`);
        } else if (diff < 86400) {
            diff /= 3600;
            Math.floor(diff) === 1 ?
            setAgo(`${Math.floor(diff)} hour ago`) :
            setAgo(`${Math.floor(diff)} hours ago`);
        } else if (diff < 31536000) {
            diff /= 86400;
            Math.floor(diff) === 1 ?
            setAgo(`${Math.floor(diff)} day ago`) :
            setAgo(`${Math.floor(diff)} days ago`);
        } else {
            diff /= 31536000;
            Math.floor(diff) === 1 ?
            setAgo(`${Math.floor(diff)} year ago`) :
            setAgo(`${Math.floor(diff)} years ago`);
        }
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
                    }}>read more</button>
                </div>
            </div>
            <div className="hero-picbox">
                <img className="hero-pic1" src={heroBlog.mainImg}></img>
                <div className="hero-pic2box">
                    <img className="hero-pic2" src={heroBlog.secImg}></img>
                </div>
            </div>
            
            <p className="hero-desc">{ago}</p>
        </div>
    )
}

export default Hero;