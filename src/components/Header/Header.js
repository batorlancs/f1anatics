import React, { useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import MenuIcon from "../../pic/menuicon.svg";
import CloseIcon from "../../pic/closeicon.svg";
import Logo from "../../pic/fanaticlogo.png";

function Header() {

    let navigate = useNavigate();
    const location = useLocation();
    const [dropDown, setDropDown] = useState(false);
    const [navbar, setNavbar] = useState();
    

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
            {/* <button className="header-logo" onClick={() => (navigate("/"))}>f1anatics</button> */}
            <button className="header-logo" onClick={() => (navigate("/"))}><img src={Logo} className="header-logo-img"></img></button>
            <div className="header-box">
                <button className="header-button1" onClick={() => (navigate("/allblogs"))}>blogs</button>
                <button className="header-button1" onClick={() => (navigate("/"))}>drivers</button>
                <button className="header-button1" onClick={() => (navigate("/"))}>teams</button>
                <button className="header-button1" onClick={() => (navigate("/admin/"))}>admin</button>
                { auth.currentUser ?
                <button className="header-button1" onClick={() => (navigate("/profile"))}>profile</button> :
                <button className="header-button1" onClick={() => (navigate("/login"))}>login</button> }
            </div>
            {   !dropDown ?
                <button className="header-button2" onClick={toggleDrop}><img src={MenuIcon} alt="menu_icon"></img></button> :
                <button className="header-button2" onClick={toggleDrop}><img src={CloseIcon} alt="menu_close_icon"></img></button>
            }

        </div>
        { dropDown && 
        <div className="drop-page">
            <div className="drop">
                { auth.currentUser ? 
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/profile");}}>PROFILE</button> :
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/login");}}>LOGIN</button> } <hr/>
                <button className="drop-link" onClick={() => {toggleDrop(); navigate("/allblogs");}}>ALL BLOGS</button><hr/>
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