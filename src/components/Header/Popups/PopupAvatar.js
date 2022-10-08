import React from "react";
import AvatarLinks from "../../../moredata/avatarlinks.json";
import "./PopupAvatar.css";
import CloseIcon from "../../../pic/commenticons/delete.svg";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../Firebase";

function PopupAvatar(props) {

    function setPhotoURL(url) {
        updateProfile(auth.currentUser, {
            photoURL: url
        }).then(() => {
            props.cancel();
            window.location.reload(false);
            console.log("url set");
        }).catch((error) => {
            console.log("a problem occured setting the picture url");
        });
    }

    console.log(AvatarLinks.length);

    return (
        <div className="loginpagepop">
            <div className="loginpop">
                <div className="login-box1pop">
                    <button onClick={() => {
                        props.cancel();
                    }}><img src={CloseIcon}></img></button>
                </div>
                <h2 className="avatar-title">Select your avatar!</h2>
                <div className="avatar-list">
                    {AvatarLinks.map((pic) => (
                        <div className="avatar-list-element">
                            <button className="profile-avatar" onClick={() => {
                                setPhotoURL(pic);
                            }}>
                                <img className="profile-avatarpic" src={pic}></img>
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