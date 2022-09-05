import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

import Header from "./Header/Header";

function Create(props) {

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const blogsCollection = collection(db, "blogs");
    let navigate = useNavigate();

    const createPost = async () => {
        await addDoc(blogsCollection, {
            key: props.blogNumber + 1,
            title: title,
            name: name,
            content: content
        });
        navigate("/");
        props.incBlogNumber();
    };

    return (
        <div className="create">
            <h1>Create your post!</h1>
            <div className="create-form">
                {/* TITLE */}
                <input onChange={(event) => {
                    setTitle(event.target.value);
                }} type="text" placeholder="Title..."/>
                {/* NAME */}
                <input onChange={(event) => {
                    setName(event.target.value);
                }} type="text" placeholder="Name..." />
                {/* CONTENT */}
                <input onChange={(event) => {
                    setContent(event.target.value);
                }} type="text" placeholder="Content..."/>
            </div>
            <button onClick={createPost} className="create-submit">Submit</button>
        </div>
    )
}

export default Create;