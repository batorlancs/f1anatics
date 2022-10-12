import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import CloseIcon from "../../pic/commenticons/delete.svg";
import AvatarLinks from "../../moredata/avatarlinks.json";

// --------------------------------------------------------------------------------------------------------------------------------
// Sign up/Register page
// --------------------------------------------------------------------------------------------------------------------------------

function Signup(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    let navigate = useNavigate();

    // if logged in, navigate home
    useEffect(() => {
        if (auth.currentUser) navigate("/");
    }, [auth.currentUser])

    // generate username from email
    function generateUsername(email) {
        let username = email.slice(0, email.indexOf("@"));
        for (let i = 0; i < 3; i++) {
            username += Math.floor(Math.random() * 10);
        }
        return username;
    }

    // randomize an avatar picture for the user
    function generateUserurl() {
        let num = Math.floor(Math.random() * AvatarLinks.length) + 1;
        return AvatarLinks(num);
    }

    // create Account with password and email
    function createAccount() {
        // empty forms
        if (email === "" || password === "" || confPassword === "") {
            setErrorMsg("please fill out all forms");
            return;
        }
        // not valid email
        if ( !(/\S+@\S+\.\S+/.test(email)) ) {
            setErrorMsg("email is not valid");
            return;
        }
        // passwords do not match
        if (password !== confPassword) {
            setErrorMsg("passwords do not match");
            return;
        }
        // password is short
        if (password.length < 8) {
            setErrorMsg("password must be minimum 8 characters");
            return;
        }

        setErrorMsg("");

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
                updateProfile(user, {
                        displayName: generateUsername(email),
                        photoURL: generateUserurl()
                    }).then(() => {
                        sendEmailVerification(user)
                            .then(() => {
                            console.log("email is sent");
                            });
                        console.log("name is set to: " + user.displayName);
                        // navigation after task is done
                        if (props.isPop) {
                            props.cancel();
                        } else {
                            navigate("/");
                            window.location.reload();
                        }
                        // 
                        
                    }).catch((error) => {
                        setErrorMsg("a problem occured setting the name :(");
                    });
            })
            .catch((error) => {
                setErrorMsg("sign up unsuccessful");
            });

        
    }

    return (
        <div className={props.isPop ? "loginpagepop" : "loginpage"}>
            <div className={props.isPop ? "loginpop" : "login"}>
                {props.isPop &&
                <div className="login-box1pop">
                    <button onClick={() => {
                        props.cancel();
                    }}><img src={CloseIcon} alt="close_icon"></img></button>
                </div>}
                <div className="login-box2">
                    <h1>Welcome!</h1>
                    <h2>Join the community to always be updated and have chats with other members of f1anatics.</h2>
                    <h3>Sign up with a new account</h3>
                    <input placeholder="email" type="email" onChange={(event) => {
                        setEmail(event.target.value);
                        setErrorMsg("");
                    }}/>
                    <input placeholder="password" type="password" onChange={(event) => {
                        setPassword(event.target.value);
                        setErrorMsg("");
                    }}/>
                    <input placeholder="confirm password" type="password" onChange={(event) => {
                        setConfPassword(event.target.value);
                        setErrorMsg("");
                    }}/>
                    { errorMsg !== "" && <h4><span>{errorMsg}</span></h4>}
                    <button onClick={createAccount} className="login-button">Sign Up</button>
                </div>
            </div>
            <div className={props.isPop ? "loginbackpop" : "loginback"}></div>
        </div>
    )
}

export default Signup;