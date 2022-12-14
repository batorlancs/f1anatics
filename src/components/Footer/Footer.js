import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import Facebook from "../../pic/socialicons/facebook.png";
import Instagram from "../../pic/socialicons/instagram.png";
import Twitter from "../../pic/socialicons/twitter.png";
import Youtube from "../../pic/socialicons/youtube.png";

function Footer() {

    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");

    function subscribe() {

        if ( !(/\S+@\S+\.\S+/.test(email)) ) {
            setErrorMsg("email is not valid");
            return;
        }

        setErrorMsg("you are now subscribed!");
    }

    return (
        <div className="footer">
            <div className="footer-grid">
                <div className="footer-column columntype1">
                    <h1>f1anatics</h1>
                    <h2>More than fans</h2>
                    <p>We are not only fans of F1. We are obsessed with all the details and information that make up our beloved sport, we analyse situations to understand and make You understand the world of F1 better and better with each article… We are F1anatics, we are More Than Fans.
                    </p>
                </div>
                <div className="footer-column columntype2">
                    <Link to="/allblogs" className="footer-link">All Blogs</Link>
                    <Link to="/" className="footer-link">Current Drivers</Link>
                    <Link to="/" className="footer-link">Current Teams</Link>
                    <Link to="/profile" className="footer-link">Profile</Link>
                    <Link to="/login" className="footer-link">Login</Link>
                    <Link to="/signup" className="footer-link">Sign Up</Link>
                </div>
                <div className="footer-column columntype3">
                    <Link to="/about" className="footer-link">About us</Link>
                    <Link to="/contact" className="footer-link">Contact us</Link>
                    <Link to="/" className="footer-link">SEO map</Link>
                </div>
                <div className="footer-column columntype4">
                    <h3>Subscribe to our newsletter</h3>
                    <input className="footer-input" type="email" placeholder="enter your email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setErrorMsg("");
                        }}
                    />
                    <button className="footer-button" onClick={subscribe}>Subscribe</button>
                    {errorMsg !== "" && <p>{errorMsg}</p>}
                </div>
            </div>
            <hr/>
            <div className="footer-socials">
                <div className="footer-socialsbox">
                    <a href="https://www.youtube.com/">{<img src={Youtube} alt="youtube_icon"></img>}</a>
                    <a href="https://www.instagram.com/"><img src={Instagram} alt="instagram_icon"></img></a>
                    <a href="https://www.facebook.com/"><img src={Facebook} alt="facebook_icon"></img></a>
                    <a href="https://www.twitter.com/"><img src={Twitter} alt="twitter_icon"></img></a>
                </div>
                <div className="footer-copyright">
                    <p>Check out our social media accounts for more!</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;