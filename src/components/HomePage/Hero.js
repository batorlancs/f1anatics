import React from "react";
import "./Hero.css";
import HeroPic from "../../pic/hero.jpg";
import HamiltonPic from "../../pic/hamilton.jpg"

function Hero(props)  {

    let heroBlog = props.blogs.find(o => o.key === props.blogNumber);

    return (
        <div className="hero">
            <div className="hero-box">
                <h1 className="hero-title">{heroBlog.title}</h1>
                <div className="hero-box-cont">
                    <p className="hero-buttondesc">Was is just a racing accident? or was it something serious? Did hamilton not leave enough space?</p>
                    <button className="hero-button" onClick={props.navigateToHeroBlog}>read more</button>
                </div>
            </div>
            <div className="hero-picbox">
                <img className="hero-pic1" src={HeroPic}></img>
                <div className="hero-pic2box">
                    <img className="hero-pic2" src={HamiltonPic}></img>
                </div>
            </div>
            
            <p className="hero-desc">- 17 hours ago -</p>
        </div>
    )
}

export default Hero;