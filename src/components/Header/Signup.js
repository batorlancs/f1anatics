import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) navigate("/");
    }, [auth.currentUser])

    function createAccount() {

        if (email === "" || password === "" || confPassword === "") {
            setErrorMsg("please fill out all forms");
            return;
        }

        if ( !(/\S+@\S+\.\S+/.test(email)) ) {
            setErrorMsg("email is not valid");
            return;
        }

        if (password !== confPassword) {
            setErrorMsg("passwords do not match");
            return;
        }

        if (password.length < 8) {
            setErrorMsg("password must be minimum 8 characters");
            return;
        }

        setErrorMsg("");

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        console.log("email is sent");
                    });
                navigate("/");
                window.location.reload();
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg("sign up unsuccessful");
                // ..
            });

        
    }

    return (
        <div className="loginpage">
            <div className="login">
                <div className="login-box1">
                    <h1>User Sign Up</h1>
                </div>
                <div className="login-box2">
                    <h2>Welcome<br/>to the F1 community!</h2>
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
            <div className="loginback"></div>
        </div>
    )
}

export default Signup;