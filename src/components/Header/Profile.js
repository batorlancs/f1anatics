import React, { useEffect } from 'react'
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import "./Profile.css";

import Header from './Header';
import Footer from '../Footer/Footer';
import EditIcon from "../../pic/editicon.svg";

function Profile() {

    let navigate = useNavigate();

    function logOut() {
        signOut(auth).then(() => {
            navigate("/");
            window.location.reload();
            console.log("signed out successfully");
          }).catch((error) => {
            console.log("error signing out");
          });
    }

    return (
        <>
            <div className="profilepage">
                <Header />
                { auth.currentUser && 
                <div className="profile">
                    <div className="profile-title">
                        <h1>Profile<br/>Info</h1>
                    </div>
                    <div className="profile-content">
                        <h1>Your details</h1>
                        <div className="profile-content-row">
                            <h2>email:</h2>
                            <h3>{auth.currentUser.email}</h3>
                        </div>
                        <div className="profile-content-row">
                            <h2>account status:</h2>
                            { auth.currentUser.emailVerified ?
                            <h2 className="green">verified</h2> :
                            <h2 className="red">not verified</h2> }
                        </div>
                        <div className="profile-content-row">
                            <h2>displayed name:</h2>
                            <h3>{auth.currentUser.displayName}</h3>
                            <button className="profile-button2"><img src={EditIcon}></img></button><br/>
                        </div>
                        <button className="profile-button1" onClick={logOut}>sign out</button>
                        <h1 className="profile-options">Other options</h1>
                        <button className="profile-button1">resend email verification</button><br/>
                        <button className="profile-button1">reset your password</button><br/>
                        <button className="profile-button1">delete your account</button><br/>
                        
                    </div>
                </div> }    
                <div className="profile-back"></div>
            </div>
            <Footer />
        </>
    )
}

export default Profile;