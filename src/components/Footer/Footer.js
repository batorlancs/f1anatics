import React, { useState } from "react";
import "./Footer.css";

import Facebook from "../../pic/socialicons/facebook.png";
import FacebookAnim from "../../pic/socialicons/facebookAnim.png";
import Instagram from "../../pic/socialicons/instagram.png";
import InstagramAnim from "../../pic/socialicons/instagramAnim.png";
import Twitter from "../../pic/socialicons/twitter.png";
import TwitterAnim from "../../pic/socialicons/twitterAnim.png";
import Youtube from "../../pic/socialicons/youtube.png";
import YoutubeAnim from "../../pic/socialicons/youtubeAnim.png";

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
                <div className="footer-column">
                    <h1>f1anatics</h1>
                    <h2>More than fans</h2>
                    <p>This is a short description of what we are and
                        what we do for the fans and all that nothing too long.
                    </p>
                </div>
                <div className="footer-column">
                    <a>All Blogs</a>
                    <a>Current Drivers</a>
                    <a>Current Teams</a>
                    <a>Profile Information</a>
                    <a>Login</a>
                    <a>Sign Up</a>
                </div>
                <div className="footer-column">
                    <a>About us</a>
                    <a>Contact us</a>
                    <a>SEO map</a>
                </div>
                <div className="footer-column">
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
                    <a href="https://www.youtube.com/">{<img src={Youtube}></img>}</a>
                    <a href="https://www.instagram.com/"><img src={Instagram}></img></a>
                    <a href="https://www.facebook.com/"><img src={Facebook}></img></a>
                    <a href="https://www.twitter.com/"><img src={Twitter}></img></a>
                </div>
                <div className="footer-copyright">
                    <p>f1anatics inc. all rights reserved</p>
                </div>
            </div>
            
        </div>
    )
}

export default Footer;