import React, { useState } from 'react'
import { auth } from "../../Firebase";
import { signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import "./Profile.css";

import Popup from './Popups/Popup';
import Popup2 from './Popups/Popup2';
import PopupAvatar from "./Popups/PopupAvatar";
import EditIcon from "../../pic/editicon.svg";
import Loading from "../../pic/publishing.svg";
import ProfilePic from "../../pic/profilepic.png";

// --------------------------------------------------------------------------------------------------------------------------------
// Profile Page
// --------------------------------------------------------------------------------------------------------------------------------

function Profile() {

    let navigate = useNavigate();
    const [poppedUp, setPoppedUp] = useState(false); // is popup1 active
    const [poppedUp2, setPoppedUp2] = useState(false); // is popup2 active
    const [avatarPop, setAvatarPop] = useState(false); // is avatar popup active
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // send email verifaction to account
    function sendEmail() {
        setLoading(true);
        setMsg("");
        sendEmailVerification(auth.currentUser)
            .then(() => {
                setLoading(false);
                setMsg("verification email sent");
            });
    }

    // send reset password to account
    function sendPasswordReset() {
        setLoading(true);
        setMsg("");
        sendPasswordResetEmail(auth, auth.currentUser.email)
            .then(() => {
                setLoading(false);
                setMsg("password reset email sent");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.code + error.message);
            });
    }

    // log out of the account
    function logOut() {
        signOut(auth).then(() => {
            navigate("/");
            window.location.reload();
            console.log("signed out successfully");
          }).catch((error) => {
            console.log("error signing out");
          });
    }


    // popup functions
    function togglePopup() {
        setPoppedUp(prev => !prev);
    }

    function togglePopup2() {
        setPoppedUp2(prev => !prev);
    }

    function cancelAvatarPop() {
        setAvatarPop(false);
    }

    return (
        <div className="profilepage">

            { auth.currentUser && poppedUp && !poppedUp2 &&
            <Popup name={auth.currentUser.displayName} toggle={togglePopup}/> }

            { auth.currentUser && poppedUp2 && !poppedUp &&
            <Popup2 name={auth.currentUser.displayName} toggle={togglePopup2}/> }

            { auth.currentUser && avatarPop && 
            <PopupAvatar cancel={cancelAvatarPop}/>}

            { auth.currentUser && 
            <div className="profile">
                <div className="profile-title">
                    <h1>Welcome back <br/><b>{auth.currentUser.displayName}</b>!</h1>
                </div>
                <div className="profile-content">
                    <div className="profile-content1">
                        <button className="profile-avatar" onClick={() => {
                            setAvatarPop(true);
                        }}>
                            <img className="profile-avatarpic" src={auth.currentUser.photoURL != null ? auth.currentUser.photoURL : ProfilePic} alt="profile_avatar_picture"></img>
                            <p>Change Avatar</p>
                        </button>
                        <div className="profile-content1-details">
                            <div className="profile-content-row">
                                <h2>username:</h2>
                                <h3>{auth.currentUser.displayName}</h3>
                                <button className="profile-button2" onClick={togglePopup}>
                                    <img src={EditIcon} alt="edit_icon"></img>
                                </button><br/>
                            </div>
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
                            <button className="profile-button1" onClick={logOut}>sign out</button>
                        </div>
                    </div>
                    <div className='profile-content2'>
                        { !auth.currentUser.emailVerified && <><button className="profile-button1" onClick={sendEmail}>resend email verification</button><br/></>}
                        <button className="profile-button1" onClick={sendPasswordReset}>send reset your password email</button><br/>
                        <button className="profile-button1" onClick={togglePopup2}>delete your account</button><br/>
                        { loading && <img src={Loading} className="profile-loading" alt="loading_icon"></img>}
                        { msg !== "" && <p className="green">{msg}</p>}
                    </div>
                </div>
            </div> }
        </div>
    )
}

export default Profile;