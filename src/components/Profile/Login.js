import React, { useState, useEffect } from "react";
import { auth, providerGoogle } from "../../Firebase";
import { signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import Popup3 from "./Popups/Popup3";
import GoogleLogo from "../../pic/google.png";
import CloseIcon from "../../pic/commenticons/delete.svg";

// --------------------------------------------------------------------------------------------------------------------------------
// Login Page
// --------------------------------------------------------------------------------------------------------------------------------

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [poppedUp, setPoppedUp] = useState(false); // is popup active

    let navigate = useNavigate();

    // popup function
    function togglePoppedUp() {
        setPoppedUp(prev => !prev);
    }

    // if logged in already navigate home
    useEffect(() => {
        if (auth.currentUser) navigate("/");
    }, [auth.currentUser])


    // sign in user with email and password
    function signIn() {
        //  forms empty
        if (email === "" || password === "") {
            setErrorMsg("please fill out all forms");
            return;
        }
        // email not valid
        if ( !(/\S+@\S+\.\S+/.test(email)) ) {
            setErrorMsg("email is not valid");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        console.log("email sent");
                    });
                // navigate after task is done
                if (props.isPop) {
                    props.cancel();
                } else {
                    navigate("/");
                }
                window.location.reload(false);
                //
            })
            .catch((error) => {
                setErrorMsg("login was unsuccessful");
            });
    }

    // sign in with google popup
    function signInGoogle() {
        signInWithPopup(auth, providerGoogle)
        .then((result) => {
            if (props.isPop) {
                props.cancel();
            } else {
                navigate("/");
            }
            window.location.reload(false);
            // ...
        }).catch((error) => {
            setErrorMsg("google sign in was unsuccessful");
        });
    }

    return (
        <div className={props.isPop ? "loginpagepop" : "loginpage"}>
            { poppedUp && <Popup3 toggle={togglePoppedUp}/>}
            <div className={props.isPop ? "loginpop" : "login"}>
                {props.isPop &&
                <div className="login-box1pop">
                    <button onClick={() => {
                        props.cancel();
                    }}><img src={CloseIcon} alt="close_icon"></img></button>
                </div>}
                <div className="login-box2">
                    <button className="login-google" onClick={signInGoogle}>
                        <img className="login-googlelogo" src={GoogleLogo} alt="google_icon"></img>
                        <span>Continue with Google</span>
                    </button>
                    <h3>or with your account</h3>
                    <input placeholder="email" type="email" onChange={(event) => {
                        setEmail(event.target.value);
                        setErrorMsg("");
                    }}/>
                    <input placeholder="password" type="password" onChange={(event) => {
                        setPassword(event.target.value);
                        setErrorMsg("");
                    }}/>
                    { errorMsg !== "" && <h4><span>{errorMsg}</span></h4>}
                    <button className="login-button" onClick={signIn}>Login</button>
                    <h4>Not a member yet?</h4>
                    <button className="signup-button" onClick={() => {
                        if (props.isPop)
                            props.register();
                        else
                            navigate("/signup");
                    }}>Sign up with a new account</button>
                    <h4>Forgot your password?</h4>
                    <button className="signup-button" onClick={() => {
                        togglePoppedUp();
                    }}>Send reset password email to your account</button>
                </div>
            </div>
            <div className={props.isPop ? "loginbackpop" : "loginback"}></div>
        </div>
    )
}

export default Login;