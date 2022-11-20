import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewMore.css";


function ViewMore() {

    let navigate = useNavigate();

    return (
        <div className="viewmore">
            <button className="viewmore-button" onClick={() => {
                navigate(`/allblogs`);
            }}>
                View More Blogs
            </button>
        </div>
    )
}

export default ViewMore