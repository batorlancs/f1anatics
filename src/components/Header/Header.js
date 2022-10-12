import React, { useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import MenuIcon from "../../pic/menuicon.svg";
import CloseIcon from "../../pic/closeicon.svg";
import Logo from "../../pic/fanaticlogo.png";

// --------------------------------------------------------------------------------------------------------------------------------
// Header
// --------------------------------------------------------------------------------------------------------------------------------

function Header() {

    let navigate = useNavigate();
    const location = useLocation();
    const [dropDown, setDropDown] = useState(false); 
    const [navbar, setNavbar] = useState(); // for navbar animation
    
    // detects if user is on the home page or not, sets animation
    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === "/") {
            setNavbar(false);
        } else {
            setNavbar(true);
        }
    }, [location])

    function toggleDrop() {
        setDropDown(prev => !prev);
    }

    // animation after scrolling on the home page
    window.addEventListener("scroll", changeBackground);
    
    function changeBackground() {
        if (location.pathname === "/") {
            window.scrollY >= 40 ? setNavbar(true) : setNavbar(false);
        } else {
            setNavbar(true);
        }
    }

    
    

    return (
        <>
        <div className={!navbar ? "header" : "header-active"}>
            <div className={!navbar ? "header-color" : "header-color-active"}></div>
            <div className={!navbar ? "header-color2" : "header-color2-active"}></div>
            {/* <button className="header-logo" onClick={() => (navigate("/"))}>f1anatics</button> */}
            <button className="header-logo" onClick={() => (navigate("/"))}><img src={Logo} className="header-logo-img" alt="header_logo_f1anatics"></img></button>
            <div className="header-box">
                <button className="header-button1" onClick={() => (navigate("/allblogs"))}>blogs</button>
                <button className="header-button1" onClick={() => (navigate("/underdev"))}>.drivers.</button>
                <button className="header-button1" onClick={() => (navigate("/underdev"))}>.teams.</button>
                <button className="header-button1" onClick={() => (navigate("/underdev"))}>.contact.</button>
                { auth.currentUser ?
                <button className="header-button1" onClick={() => (navigate("/profile"))}>profile</button> :
                <button className="header-button1" onClick={() => (navigate("/login"))}>login</button> }
            </div>
            {   !dropDown ?
                <button className="header-button2" onClick={toggleDrop}><img src={MenuIcon} alt="menu_icon" className="header-drop-img1"></img></button> :
                <button className="header-button2" onClick={toggleDrop}><img src={CloseIcon} alt="menu_close_icon" className="header-drop-img2"></img></button>
            }

        </div>
        <div className={dropDown ? "drop-page" : ""}>
            <div className={dropDown ? "drop" : "drop-off"}>
                { auth.currentUser ? 
                <button className={dropDown ? "drop-link" : "drop-link-off"} onClick={() => {toggleDrop(); navigate("/profile");}}>PROFILE</button> :
                <button className={dropDown ? "drop-link" : "drop-link-off"}  onClick={() => {toggleDrop(); navigate("/login");}}>LOGIN</button> }
                <button className={dropDown ? "drop-link" : "drop-link-off"}  onClick={() => {toggleDrop(); navigate("/allblogs");}}>ALL BLOGS</button>
                <button className={dropDown ? "drop-link" : "drop-link-off"}  onClick={() => {toggleDrop(); navigate("/underdev");}}>CURRENT DRIVERS</button>
                <button className={dropDown ? "drop-link" : "drop-link-off"}  onClick={() => {toggleDrop(); navigate("/underdev");}}>CURRENT TEAMS</button>
                <button className={dropDown ? "drop-link" : "drop-link-off"}  onClick={() => {toggleDrop(); navigate("/underdev");}}>ABOUT US</button>
                <button className={dropDown ? "drop-link" : "drop-link-off"}  onClick={() => {toggleDrop(); navigate("/underdev");}}>CONTACT US</button>
                <button className={dropDown ? "drop-link" : "drop-link-off"}  onClick={() => {toggleDrop(); navigate("/");}}>HOME</button>
            </div>
            {dropDown && <div className="drop-back">
                <button onClick={toggleDrop} className="drop-clicktracker"></button>
            </div>}
        </div>
        </>
    )
}

export default Header;