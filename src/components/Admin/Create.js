import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Firebase";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import BlogPrev from "./CreateComp/BlogPrev";
import CardPrev from "./CreateComp/CardPrev";
import "./Create.css";
import Publishing from "../../pic/publishing.svg";
import TextEditor from "./CreateComp/TextEditor";

function Create(props) {

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [editor1, setEditor1] = useState(null);
    const [editor2, setEditor2] = useState(null);

    const [poppedUp, setPoppedUp] = useState(false);

    function toggleEditor1(props) {
        setEditor1(props);
    }

    function toggleEditor2(props) {
        setEditor2(props);
    }

    const [imgMain, setImgMain] = useState(null);
    const [imgSec, setImgSec] = useState(null);

    const [isPublishing, setIsPublishing] = useState(false);
    const publishing = <div className="publishing">
                            <img className="publishing-img" src={Publishing} alt="publishing-icon"></img>
                            <h4>publishing...</h4>
                        </div>;

    const [errorMsg, setErrorMsg] = useState("");

    const blogsCollection = collection(db, "blogs");
    let navigate = useNavigate();


    const uploadImages = () => {
        // error checking
        if (title === "" || name === "" || desc === "" || editor1 === "" || editor2 === "") {
            setErrorMsg("please fill out all forms");
            return;
        } else {
            setErrorMsg("");
        }

        if (imgMain == null || imgSec == null) {
            setErrorMsg("error uploading the images..");
            return;
        } else {
            setErrorMsg("");
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
            content: editor1,
            content2: editor2,
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
        window.location.reload(false);
    };

    return (
        <div className="createpage">
            <div className="create-titlebox">
                <div className="create-title">
                    <h1><Link className="create-titlelink" to="/admin">ADMIN</Link> BLOG CREATE</h1>
                    <p>Make sure the pictures uploaded are 1920x1080 for good quality.</p>
                </div>
            </div>
            <div className="create">

                <div className="create-form">

                    {/* TITLE */}
                    <h2>Insert Title</h2>
                    <textarea className="title" onChange={(event) => {
                        setTitle(event.target.value);
                        setErrorMsg("");
                    }} placeholder="title..." maxLength="74"/>

                    {/* NAME */}
                    <h2>Insert Your Name</h2>
                    <textarea className="name" onChange={(event) => {
                        setName(event.target.value);
                        setErrorMsg("");
                    }} placeholder="name..." maxLength="50"/>

                    {/* DESC */}
                    <h2>Insert Short Description</h2>
                    <textarea className="desc" onChange={(event) => {
                        setDesc(event.target.value);
                        setErrorMsg("");
                    }} placeholder="desc..." maxLength="130"/>

                    <h2>Insert Content</h2>
                    <TextEditor toggleEditor={toggleEditor1}/>
                    <h2>Insert Content After The Picture</h2>
                    <TextEditor toggleEditor={toggleEditor2}/>


                    {/* FILE INPUT MAIN */}
                    <h2>Upload Main Image</h2>
                    <input className="imgMain" type="file" onChange={(event) => {
                        setImgMain(event.target.files[0]);
                        setErrorMsg("");
                    }}/>

                    {/* FILE INPUT SECONDARY */}
                    <h2>Upload Secondary Image</h2>
                    <input className="imgSec" type="file" onChange={(event) => {
                        setImgSec(event.target.files[0]);
                        setErrorMsg("");
                    }}/>
                    
                    <h2 className="error">{errorMsg}</h2>
                    <button className="review-button" onClick={() => {
                        setPoppedUp(true);
                    }}>REVIEW BLOG</button>
                    {isPublishing ? publishing : <button onClick={uploadImages} className="create-button">PUBLISH BLOG</button>}
                    
                </div>
                
            </div>

            { poppedUp && <div className="review-page">
                <div className="review">
                    <BlogPrev title={title} name={name} desc={desc} editor1={editor1} editor2={editor2} imgMain={imgMain} imgSec={imgSec}/>
                    <h1>BLOG CARDS ON THE HOME PAGE</h1>
                    <CardPrev title={title} name={name} desc={desc}/>
                    <button className="reviewpage-button" onClick={() => {
                        setPoppedUp(false);
                    }}>GO BACK</button>
                </div>
                <div className="popup-back"></div>
            </div> }
            
        </div>
    )
}

export default Create;