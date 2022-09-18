import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "./Firebase";

import Admins from "./admin/admins.json";

import Home from "./components/Home";
import Create from "./components/Admin/Create";
import Blog from "./components/Blog";
import Login from "./components/Header/Login";
import Signup from "./components/Header/Signup";
import Profile from "./components/Header/Profile";
import Admin from "./components/Admin/Admin";
import Delete from "./components/Admin/Delete.js";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
            <Header />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home blogs={blogList} blogNumber={blogNumber}/>}></Route>
                {checkIfAdmin() && <Route path="/admin" element={<Admin />}></Route>}
                {checkIfAdmin() && <Route path="/admin/create" element={<Create blogNumber={blogNumber} incBlogNumber={() => {setBlogNumber(prevBlogNumber => prevBlogNumber++);}}/>}></Route>}
                {checkIfAdmin() && <Route path="/admin/delete" element={<Delete blogs={blogList} />}></Route>}
                {blogList.map((blog) => {
                    return (
                        <Route key={blog.id} path={`/blog/${blog.id}`} element={<Blog blogdata={blog}/>}></Route>
                    )
                })}
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
            </Routes>
            {blogList.length > 0 && <Footer />}
        </Router>
    )
}

export default App;