import React, { useState } from "react";
import { auth } from "../../../Firebase";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../../pic/commenticons/delete.svg";

// --------------------------------------------------------------------------------------------------------------------------------
// Delete User Popup
// --------------------------------------------------------------------------------------------------------------------------------

function Popup2(props) {

    let navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    
    function deleteAccount() {
        deleteUser(auth.currentUser).then(() => {
                console.log("delete successful");
                props.toggle();
                navigate("/");
                window.location.reload();
                
            }).catch((error) => {
                console.log(error);
                setErrorMsg("an error occured");
            });
    }


    return (
        <div className="profile-popup-page">
            <div className="profile-popup">
                <div className="login-box1pop">
                    <button onClick={() => {
                        props.toggle();
                    }}><img src={CloseIcon} alt="close-icon"></img></button>
                </div>
                <h1>Are you sure you want to delete your account?</h1>
                <h2>This means you will lose all of your saved data</h2>
                <div className="profile-popup-choice">
                    <button className="profile-button3 red" onClick={deleteAccount}>delete</button>
                    <button className="profile-button3" onClick={props.toggle}>cancel</button>
                </div>
                <p className="red">{errorMsg}</p>
            </div>
            <div className="profile-popup-back"></div>
        </div>
    )
    }

export default Popup2;