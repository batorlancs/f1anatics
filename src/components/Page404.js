import React from "react";
import "./Page404.css";
import Icon404 from "../pic/404.svg";
import { useNavigate } from "react-router-dom";

function Page404() {

    let navigate = useNavigate();

    return (
        <div className="page404">
            <div className="page404-box">
                <div className="page404-box-imgcont">
                    <img className="page404-img" src={Icon404}/>
                </div>
                <div className="page404-box-cont">
                    <h1 className="page404-404">404</h1>
                    <h2 className="page404-desc">Sorry, the page you are looking for could not be found</h2>
                    <button className="hero-button" onClick={() => {
                        navigate("/");
                    }}>go home</button>
                </div>
            </div>
        </div>
  )
}

export default Page404;