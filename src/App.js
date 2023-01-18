import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "./Firebase";

import Admins from "./admin/admins.json";

import Home from "./components/Home";
import Create from "./components/Admin/Create";
import Blog from "./components/Blog";
import Login from "./components/Profile/Login";
import Signup from "./components/Profile/Signup";
import Profile from "./components/Profile/Profile";
import Admin from "./components/Admin/Admin";
import Delete from "./components/Admin/Delete.js";
import AllBlogs from "./components/AllBlogs/AllBlogs";
import ScrollToTop from "./components/Other/ScrollToTop";
import Page404 from "./components/Other/Page404";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import UnderDev from "./components/Other/UnderDev";
import "./App.css";

function App() {

    const [blogList, setBlogList] = useState([]);
    const [blogNumber, setBlogNumber] = useState(1);
    let blogsCollection = collection(db, "blogs");

    function checkIfAdmin() {
        return auth.currentUser &&
        (Admins.indexOf(auth.currentUser.uid) !== -1);
    }

    function calcPosted(blogtime) {
        var today = new Date().getTime();
        var diff = (today - blogtime) / 1000;
        if (diff < 60) {
            return "less then a minute ago";
        } else if (diff < 3600) {
            diff /= 60;
            if (Math.floor(diff) === 1)
                return (`${Math.floor(diff)} minute ago`);
            else
                return (`${Math.floor(diff)} minutes ago`);
        } else if (diff < 86400) {
            diff /= 3600;
            if (Math.floor(diff) === 1)
                return (`${Math.floor(diff)} hour ago`);
            else
                return (`${Math.floor(diff)} hours ago`);
        } else if (diff < 2628288) {
            diff /= 86400;
            if (Math.floor(diff) === 1)
                return (`${Math.floor(diff)} day ago`);
            else
                return (`${Math.floor(diff)} days ago`);
        } else if (diff < 31536000) {
            diff /= 2628288;
            if (Math.floor(diff) === 1)
                return (`${Math.floor(diff)} month ago`);
            else
                return (`${Math.floor(diff)} months ago`);
        } else {
            diff /= 31536000;
            if (Math.floor(diff) === 1)
                return (`${Math.floor(diff)} year ago`);
            else
                return (`${Math.floor(diff)} years ago`);
        }
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
                <Route path="/" element={<Home blogs={blogList} blogNumber={blogNumber} calcPosted={calcPosted}/>}></Route>
                {checkIfAdmin() && <Route path="/admin" element={<Admin />}></Route>}
                {checkIfAdmin() && <Route path="/admin/create" element={<Create blogNumber={blogNumber} incBlogNumber={() => {setBlogNumber(prevBlogNumber => prevBlogNumber++);}}/>}></Route>}
                {checkIfAdmin() && <Route path="/admin/delete" element={<Delete blogs={blogList}/>}></Route>}
                {checkIfAdmin() && blogList.map((blog) => {
                    return (
                        <Route key={blog.id} path={`/admin/update/${blog.id}`} element={<Create blogdata={blog}/>}></Route>
                    )
                })}
                {blogList.map((blog) => {
                    return (
                        <Route key={blog.id} path={`/blog/${blog.id}`} element={<Blog blogdata={blog} calcPosted={calcPosted}/>}></Route>
                    )
                })}
                {blogList.length > 0 && <Route path="/allblogs" element={<AllBlogs blogs={blogList} calcPosted={calcPosted}/>}></Route>}
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/underdev" element={<UnderDev />}></Route>
                <Route path="/404" element={<Page404 />}></Route>
                <Route path="*" element={<Page404 />} />
                <Route path="" element={<Page404 />} />
                <Route  element={<Page404 />} />
            </Routes>
            {blogList.length > 0 && <Footer />}
        </Router>
    )
}

export default App;