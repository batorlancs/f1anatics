import React, { useState, useEffect } from "react";
import { auth, providerGoogle } from "../../Firebase";
import { signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import Popup3 from "./Popups/Popup3";
import GoogleLogo from "../../pic/google.png";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [poppedUp, setPoppedUp] = useState(false);

    let navigate = useNavigate();

    function togglePoppedUp() {
        setPoppedUp(prev => !prev);
    }

    useEffect(() => {
        if (auth.currentUser) navigate("/");
    }, [auth.currentUser])

    function signIn() {

        if (email === "" || password === "") {
            setErrorMsg("please fill out all forms");
            return;
        }

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
                navigate("/");
                window.location.reload(false);
            })
            .catch((error) => {
                setErrorMsg("login was unsuccessful");
            });
    }

    function signInGoogle() {
        signInWithPopup(auth, providerGoogle)
        .then((result) => {
            navigate("/");
            window.location.reload();
            // ...
        }).catch((error) => {
            setErrorMsg("google sign in was unsuccessful");
        });
    }

    return (
        <div className="loginpage">
            { poppedUp && <Popup3 toggle={togglePoppedUp}/>}
            <div className="login">
                <div className="login-box1">
                    <h1>User Login</h1>
                </div>
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
                        navigate("/signup");
                    }}>Sign up with a new account</button>
                    <h4>Forgot your password?</h4>
                    <button className="signup-button" onClick={() => {
                        togglePoppedUp();
                    }}>Send reset password email to your account</button>
                </div>
            </div>
            <div className="loginback"></div>
        </div>
    )
}

export default Login;