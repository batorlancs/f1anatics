import React, { useState, useEffect } from "react";
import "./Page404.css";
import LoadingIcon from "../pic/publishing.svg";
import { useNavigate } from "react-router-dom";

function Page404() {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1500)
    }, [])

    return (
        <div className="page404">
            { !loading ?
            <img className="page404-loading" src={LoadingIcon}></img> :
            <div className="page404-box">
                <h1 className="page404-404">404</h1>
                <h2 className="page404-desc">Sorry, the page you are looking for could not be found.</h2>
                <button className="hero-button" onClick={() => {
                    navigate("/");
                }}>go home</button>
            </div>}
        </div>
  )
}

export default Page404;