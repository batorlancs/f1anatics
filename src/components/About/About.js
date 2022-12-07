import React from "react";
import "./About.css";
import F1Gif from "../../pic/f1.gif";

function About() {
    return (
        <div className="about">
            <div className="about-shape"></div>
            <div className="about-shape2"></div>
            <div className="about-shape3"></div>
            <div className="about-box1">
                <img src={F1Gif}></img>
                <div className="about-box1-cont">
                    <h1>About us</h1>
                    <p>We are not only fans of F1.
                    We are obsessed with all the details and information that
                    make up our beloved sport, we analyse situations to
                    understand and make You understand the world of
                    F1 better and better with each article…
                    We are <green>F1anatics</green>, we are 
                    <green> More Than Fans.</green></p>
                </div>
            </div>
        </div>
    )
}

export default About;