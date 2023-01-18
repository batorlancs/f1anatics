import React, { useState } from "react";
import { auth } from "../../../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// --------------------------------------------------------------------------------------------------------------------------------
// Send Password Reset Email Popup
// --------------------------------------------------------------------------------------------------------------------------------

function Popup3(props) {

    const [errorMsg, setErrorMsg] = useState("");
    const [passwordEmail, setPasswordEmail] = useState("");

    console.log(passwordEmail);

    function sendPasswordEmail() {

        if (passwordEmail === "") {
            setErrorMsg("please enter your email");
            return;
        }
        if ( !(/\S+@\S+\.\S+/.test(passwordEmail)) ) {
            setErrorMsg("email is not valid");
            return;
        }

        setErrorMsg("");
        sendPasswordResetEmail(auth, passwordEmail)
            .then(() => {
                props.toggle();
            })
            .catch((error) => {
                console.log(error.code + error.message);
                setErrorMsg("an error occured");
            });
    }

    return (
        <div className="profile-popup-page">
            <div className="profile-popup">
                <h2>enter your email to reset your password:</h2>
                { errorMsg !== "" && <p className="red">{errorMsg}</p>}
                <input placeholder="your email" type="email" maxLength="40" onChange={(event) => {
                    setPasswordEmail(event.target.value);
                    setErrorMsg("");
                }}/>
                <button className="profile-button3" onClick={sendPasswordEmail}>send</button>
                <button className="profile-button1" onClick={props.toggle}>cancel</button>
            </div>
            <div className="profile-popup-back"></div>
        </div>
    )
}

export default Popup3;