import React from "react";
import AvatarLinks from "../../../moredata/avatarlinks.json";
import "./PopupAvatar.css";
import CloseIcon from "../../../pic/commenticons/delete.svg";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../Firebase";

// --------------------------------------------------------------------------------------------------------------------------------
// Set Avatar Popup
// --------------------------------------------------------------------------------------------------------------------------------

function PopupAvatar(props) {

    // update profile avatar
    function setPhotoURL(url) {
        updateProfile(auth.currentUser, {
            photoURL: url
        }).then(() => {
            props.cancel();
            window.location.reload(false);
            console.log("url set");
        }).catch((error) => {
            console.log("a problem occured setting the photo url");
        });
    }

    return (
        <div className="loginpagepop">
            <div className="loginpop">
                <div className="login-box1pop">
                    <button onClick={() => {
                        props.cancel();
                    }}><img src={CloseIcon} alt="close_icon"></img></button>
                </div>
                <div className="avatar-title">
                    <h2>Select your <b>avatar!</b></h2>
                </div>
                <div className="avatar-list">
                    {AvatarLinks.map((pic) => (
                        <div className="avatar-list-element">
                            <button className="profile-avatar2" onClick={() => {
                                setPhotoURL(pic);
                            }}>
                                <img className="profile-avatarpic" src={pic} alt="profile_avatar_choice"></img>
                                <p>Select</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="loginbackpop"></div>
        </div>
    )
}

export default PopupAvatar;