import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewMore.css";
import ArrowIcon from "../../pic/closeicon.svg";


function ViewMore() {

    let navigate = useNavigate();

    return (
        <div className="viewmore">
            <button className="viewmore-button" onClick={() => {
                navigate(`/allblogs`);
            }}>
                <h3 className="viewmore-text">View More Blogs</h3>
                <img className="viewmore-arrow" src={ArrowIcon} alt="right-point-arrow"></img>
            </button>
        </div>
    )
}

export default ViewMore