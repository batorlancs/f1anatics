import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db, auth } from "./Firebase";

import Admins from "./admin/admins.json";

import Home from "./components/Home";
import Create from "./components/Create";
import Blog from "./components/Blog";
import Login from "./components/Header/Login";
import Header from "./components/Header/Header";
import "./App.css";

function App() {

    const [blogList, setBlogList] = useState([]);
    const [blogNumber, setBlogNumber] = useState(1);
    let blogsCollection = collection(db, "blogs");

    function checkIfAdmin() {
        return auth.currentUser &&
        (Admins.indexOf(auth.currentUser.uid) !== -1);
    }

    // get all blogs from the firebase
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(blogsCollection);
            const newData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setBlogList(newData);
            let highest = 1;
            newData.map((data) => {
                if (data.key > highest) highest = data.key;
            })
            setBlogNumber(highest);
        }
        getPosts();
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home blogs={blogList} blogNumber={blogNumber}/>}></Route>
                {
                    checkIfAdmin() &&
                    <Route path="/admin/create" element={<Create blogNumber={blogNumber} incBlogNumber={() => {setBlogNumber(prevBlogNumber => prevBlogNumber++);}}/>}></Route>
                }
                {blogList.map((blog) => {
                    return (
                        <Route key={blog.id} path={`/blog/${blog.id}`} element={<Blog blogid={blog.id} blogdata={blog}/>}></Route>
                    )
                })}
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default App;