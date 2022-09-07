import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage} from "../../Firebase";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import BlogPrev from "./CreateComp/BlogPrev";
import "./Create.css";
import Publishing from "../../pic/publishing.svg";

function Create(props) {

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [content, setContent] = useState("");
    const [content2, setContent2] = useState("");

    const [imgMain, setImgMain] = useState(null);
    const [imgSec, setImgSec] = useState(null);

    const [isPublishing, setIsPublishing] = useState(false);
    const publishing = <div className="publishing">
                            <img className="publishing-img" src={Publishing}></img>
                            <h4>publishing...</h4>
                        </div>;

    const blogsCollection = collection(db, "blogs");
    let navigate = useNavigate();

    const uploadImages = () => {
        if (imgMain == null || imgSec == null) {
            console.log("throw error");
            return;
        }

        // set loading animation
        setIsPublishing(true);

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
            desc: desc,
            content: content,
            content2, content2,
            mainImg: url1,
            secImg: url2,
            date: {
                year: new Date().getFullYear().toString(),
                month: (new Date().getMonth() + 1).toString(),
                day: new Date().getDate().toString(),
                time: new Date().getTime()
            }
        });
        navigate("/");
        props.incBlogNumber();
    };

    return (
        <div className="createpage">
            <Header />
            <div className="create-titlebox">
                <div className="create-title">
                    <h1>ADMIN BLOG CREATE</h1>
                    <p>Make sure the pictures uploaded are 1920x1080 for good quality.</p>
                </div>
            </div>
            <div className="create">

                <div className="create-form">

                    {/* TITLE */}
                    <h2>Insert Title<span>title of the blog</span></h2>
                    <textarea className="title" onChange={(event) => {
                        setTitle(event.target.value);
                    }} placeholder="title..." />

                    {/* NAME */}
                    <h2>Insert Your Name<span>author's name</span></h2>
                    <textarea className="name" onChange={(event) => {
                        setName(event.target.value);
                    }} placeholder="name..." />

                    {/* DESC */}
                    <h2>Insert Short Description <span>this will only appear on the homepage</span></h2>
                    <textarea className="desc" onChange={(event) => {
                        setDesc(event.target.value);
                    }} placeholder="desc..." />

                    {/* CONTENT */}
                    <h2>Insert Content<span>blog paragraphs before picture appears</span></h2>
                    <textarea className="content"onChange={(event) => {
                        setContent(event.target.value);
                    }} placeholder="content..."/>

                    {/* CONTENT2 */}
                    <h2>Insert Content After The Picture<span>blog paragraphs after picture appears</span></h2>
                    <textarea className="content2"onChange={(event) => {
                        setContent2(event.target.value);
                    }} placeholder="content after picture..."/>

                    {/* FILE INPUT MAIN */}
                    <h2>Upload Main Image</h2>
                    <input className="imgMain" type="file" onChange={(event) => {
                        setImgMain(event.target.files[0]);
                    }}/>

                    {/* FILE INPUT SECONDARY */}
                    <h2>Upload Secondary Image</h2>
                    <input className="imgSec" type="file" onChange={(event) => {
                        setImgSec(event.target.files[0]);
                    }}/>
                    
                    
                    {/* {isPublishing ? publishing : <button onClick={() => { setIsPublishing(true) }} className="create-button">PUBLISH BLOG</button>} */}
                    {isPublishing ? publishing : <button onClick={uploadImages} className="create-button">PUBLISH BLOG</button>}
                </div>
                
            </div>
            <div className="create-titlebox">
                <div className="create-title">
                    <h1>HERE IS A PREVIEW OF YOUR BLOG</h1>
                    <p>Be aware that pictures you uploaded are going to appear in the gray blocks.
                        Moreover, date is just an example. It will show today's date when published.
                        If you found a format like "xxx x xxx" that means you forgot to fill out that form.
                    </p>
                </div>
            </div>
            <BlogPrev title={title} name={name} desc={desc} content={content} content2={content2} imgMain={imgMain} imgSec={imgSec}/>
            <div className="create-titlebox">
                <div className="create-title">
                    <h1>PREVIEW OF YOUR BLOG HOME CARDS</h1>
                    <p>These cards only appear on the homepage.
                        Make sure everything fits nicely (title and short description).
                        When done you are ready to publish your blog.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Create;