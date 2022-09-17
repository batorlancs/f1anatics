// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd6uc__BH_GlgZfrE5_1psJN3xjTuY2V0",
  authDomain: "sample-7945b.firebaseapp.com",
  projectId: "sample-7945b",
  storageBucket: "sample-7945b.appspot.com",
  messagingSenderId: "452243992627",
  appId: "1:452243992627:web:0513c904d71ed7eb283346",
  measurementId: "G-Z8MKC3Y268"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const storage = getStorage(app);