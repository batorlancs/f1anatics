import React from "react";
import { auth, providerGoogle } from "../../Firebase";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {

    function logOut() {
        signOut(auth).then(() => {
            window.location.reload(false);
            console.log("signed out successfully");
          }).catch((error) => {
            console.log("error signing out");
          });
    }

    function signInGoogle() {
        signInWithPopup(auth, providerGoogle)
        .then((result) => {
            window.location.reload(false);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <div className="login">
            <h1>Login or Sign up</h1>
            <button onClick={signInGoogle}>Sign in with google</button>
            <br/>
            <br/>
            <input placeholder="email" type="text" />
            <input placeholder="password" type="text" />
            {auth.currentUser && <h1>you are logged in {auth.currentUser.uid}</h1>}
            <button>Submit</button>
            <button onClick={logOut}>Sign out</button>
        </div>
    )
}

export default Login;