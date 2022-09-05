import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {

    let navigate = useNavigate();

    return (
        <div className="header">
            <h2 className="header-logo">f1anatics</h2>
            <div className="header-box">
                <button onClick={() => (navigate("/login"))}>Blogs</button>
                <button onClick={() => (navigate("/login"))}>Drivers</button>
                <button onClick={() => (navigate("/login"))}>Teams</button>
                <button onClick={() => (navigate("/login"))}>Contact</button>
                <button onClick={() => (navigate("/login"))}>Login</button>
            </div>
        </div>
    )
}

export default Header;