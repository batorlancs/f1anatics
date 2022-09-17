import React, { useState } from "react";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import MenuIcon from "../../pic/menuicon.svg";
import CloseIcon from "../../pic/closeicon.svg";

function Header() {

    let navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);

    function toggleDrop() {
        setDropDown(prev => !prev);
    }

    return (
        <>
        <div className="header">
            <button className="header-logo" onClick={() => (navigate("/"))}>f1anatics</button>
            <div className="header-box">
                <button className="header-button1" onClick={() => (navigate("/"))}>blogs</button>
                <button className="header-button1" onClick={() => (navigate("/"))}>drivers</button>
                <button className="header-button1" onClick={() => (navigate("/"))}>teams</button>
                <button className="header-button1" onClick={() => (navigate("/admin/"))}>admin</button>
                { auth.currentUser ?
                <button className="header-button1" onClick={() => (navigate("/profile"))}>profile</button> :
                <button className="header-button1" onClick={() => (navigate("/login"))}>login</button> }
            </div>
            {   !dropDown ?
                <button className="header-button2" onClick={toggleDrop}><img src={MenuIcon}></img></button> :
                <button className="header-button2" onClick={toggleDrop}><img src={CloseIcon}></img></button>
            }

        </div>
        { dropDown && 
        <div className="drop-page">
            <div className="drop">
                { auth.currentUser ? 
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/profile");}}>PROFILE</button> :
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/login");}}>LOGIN</button> } <hr/>
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/");}}>ALL BLOGS</button><hr/>
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/");}}>CURRENT DRIVERS</button><hr/>
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/");}}>CURRENT TEAMS</button><hr/>
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/");}}>ABOUT US</button><hr/>
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/");}}>CONTACT US</button><hr/>
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/");}}>HOME</button><hr/>
            </div>
            <div className="drop-back">
                <button onClick={toggleDrop} className="drop-clicktracker"></button>
            </div>
        </div> }
        </>
    )
}

export default Header;