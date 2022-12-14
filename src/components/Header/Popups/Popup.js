import React, { useState, useEffect } from "react"
import { auth } from "../../../Firebase";
import { updateProfile } from "firebase/auth";
import "../Profile.css";
import CloseIcon from "../../../pic/commenticons/delete.svg";

// --------------------------------------------------------------------------------------------------------------------------------
// Change Name Popup
// --------------------------------------------------------------------------------------------------------------------------------

function Popup(props) {

    const [errorMsg, setErrorMsg] = useState("");
    const [newName, setNewName] = useState(props.name);

    // set input value to the name
    useEffect(() => {
        document.getElementById("nameInput").value = props.name;
    }, [])

    // update name of the user
    function updateName() {
        if (props.name === newName) {
            setErrorMsg("this is your current name");
            return;
        }
        if (newName.length < 6) {
            setErrorMsg("your name must be at least 6 characters");
            return;
        }
        if (!(/^[A-Za-z0-9 -]*$/.test(newName))) {
            setErrorMsg("your name can only contain letters and numbers");
            return;
        }

        updateProfile(auth.currentUser, {
                displayName: newName
            }).then(() => {
                console.log("successful change");
                props.toggle();
                window.location.reload();
            }).catch((error) => {
                setErrorMsg("a problem occured :(");
            });

    }

    return (
        <div className="profile-popup-page">
            <div className="profile-popup">
                <div className="login-box1pop">
                    <button onClick={() => {
                        props.toggle();
                    }}><img src={CloseIcon} alt="close_icon"></img></button>
                </div>
                <h2>your new displayed name:</h2>
                { errorMsg !== "" && <p className="red">{errorMsg}</p>}
                <input id="nameInput" type="text" maxLength="20" onChange={(event) => {
                    setNewName(event.target.value);
                    setErrorMsg("");
                }}/>
                <button className="profile-button3" onClick={updateName}>submit</button>
                <button className="profile-button1" onClick={props.toggle}>cancel</button>
            </div>
            <div className="profile-popup-back"></div>
        </div>
    )
}

export default Popup;