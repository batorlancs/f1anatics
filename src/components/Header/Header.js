import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {

    let navigate = useNavigate();

    return (
        <div className="header">
            <button className="header-logo" onClick={() => (navigate("/"))}>f1anatics</button>
            <div className="header-box">
                <button onClick={() => (navigate("/"))}>blogs</button>
                <button onClick={() => (navigate("/"))}>drivers</button>
                <button onClick={() => (navigate("/"))}>teams</button>
                <button onClick={() => (navigate("/create"))}>create</button>
                <button onClick={() => (navigate("/login"))}>login</button>
            </div>
        </div>
    )
}

export default Header;