import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage} from "../Firebase";
import { useNavigate } from "react-router-dom";

import Header from "./Header/Header";

function Create(props) {

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const [imgMain, setImgMain] = useState(null);
    const [imgSec, setImgSec] = useState(null);

    const blogsCollection = collection(db, "blogs");
    let navigate = useNavigate();

    const uploadImages = () => {
        if (imgMain == null || imgSec == null) {
            console.log("throw error");
            return;
        }
        const storageRefMain = ref(storage, `images/${props.blogNumber + 1}/main.png`);
        const storageRefSec = ref(storage, `images/${props.blogNumber + 1}/secondary.png`);
        uploadBytes(storageRefMain, imgMain)
            .then((snapshot) => {
                console.log("Main successfully uploaded");
                getDownloadURL(storageRefMain)
                    .then((url1) => {

                        uploadBytes(storageRefSec, imgSec)
                            .then((snapshot) => {
                                console.log("Secondary successfully uploaded");
                                getDownloadURL(storageRefSec)
                                    .then((url2) => {
                                        createPost({url1, url2});
                                    })
                            })

                    })
            })
    }

    const createPost = async ({url1, url2}) => {
        await addDoc(blogsCollection, {
            key: (props.blogNumber + 1),
            title: title,
            name: name,
            content: content,
            mainImg: url1,
            secImg: url2
        });
        navigate("/");
        props.incBlogNumber();
    };

    return (
        <div className="create">
            <h1>Create your post!</h1>
            <div className="create-form">
                {/* TITLE */}
                <h2>Insert Title</h2>
                <input onChange={(event) => {
                    setTitle(event.target.value);
                }} type="text" placeholder="Title..."/>
                {/* NAME */}
                <h2>Insert Your Name</h2>
                <input onChange={(event) => {
                    setName(event.target.value);
                }} type="text" placeholder="Name..." />
                {/* CONTENT */}
                <h2>Insert Content</h2>
                <input onChange={(event) => {
                    setContent(event.target.value);
                }} type="text" placeholder="Content..."/>
                <h2>Upload Main Image</h2>
                <input type="file" onChange={(event) => {
                    setImgMain(event.target.files[0]);
                }}/>
                <h2>Upload Secondary Image</h2>
                <input type="file" onChange={(event) => {
                    setImgSec(event.target.files[0]);
                }}/>
            </div>
            <h1>make sure everything is filled out before submiting</h1>
            <button onClick={uploadImages} className="create-submit">Submit</button>
        </div>
    )
}

export default Create;