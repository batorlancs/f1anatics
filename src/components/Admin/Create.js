import React, { useState, useEffect } from "react";
import { addDoc, doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Firebase";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import BlogPrev from "./CreateComp/BlogPrev";
import CardPrev from "./CreateComp/CardPrev";
import "./Create.css";
import Publishing from "../../pic/publishing.svg";
import TextEditor from "./CreateComp/TextEditor";

// --------------------------------------------------------------------------------------------------------------------------------
// Create or Update a Post
// --------------------------------------------------------------------------------------------------------------------------------

function Create(props) {

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const [editor1, setEditor1] = useState(null); // text 1 of blog
    const [editor2, setEditor2] = useState(null); // text 2 of blog
    const [isSecImg, setIsSecImg] = useState(false); // if user wants second image to appear in the blog

    const [poppedUp, setPoppedUp] = useState(false); // preview popup 1
    const [stick1, setStick1] = useState(""); // editor 1 stickyness
    const [stick2, setStick2] = useState(""); // editor 2 stickyness

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

    // if updating the blog, set the inputs to the current values
    useEffect(() => {
        if (props.blogdata != null) {
            document.getElementById("title").value = props.blogdata.title;
            document.getElementById("name").value = props.blogdata.name;
            document.getElementById("desc").value = props.blogdata.desc;
            document.getElementById("sec-img-check").checked = props.blogdata.hideSecImg;
            setIsSecImg(props.blogdata.hideSecImg);
        } else {
            console.log("not update");
        }
    }, [])

    // update uploaded images in the firebase storage
    const updateImages = () => {
        // set loading animation
        setIsPublishing(true);
        if (imgMain != null) {
            const storageRefMain = ref(storage, `images/${props.blogdata.key}/main.png`);
            uploadBytes(storageRefMain, imgMain)
                .then((snapshot) => {
                    console.log("Main successfully uploaded");
                    getDownloadURL(storageRefMain)
                        .then((url1) => {
                            if (imgSec != null) {
                                const storageRefSec = ref(storage, `images/${props.blogdata.key}/secondary.png`);
                                uploadBytes(storageRefSec, imgSec)
                                .then((snapshot) => {
                                    console.log("Secondary successfully uploaded");
                                    getDownloadURL(storageRefSec)
                                        .then((url2) => {
                                            updatePost({url1, url2});
                                        })
                                })
                            } else {
                                let url2 = "";
                                updatePost({url1, url2})
                            }
                        })
                })
        } else if (imgSec != null) {
            const storageRefSec = ref(storage, `images/${props.blogdata.key}/secondary.png`);
            uploadBytes(storageRefSec, imgSec)
                .then((snapshot) => {
                    console.log("Secondary successfully uploaded");
                    getDownloadURL(storageRefSec)
                        .then((url2) => {
                            let url1 = "";
                            updatePost({url1, url2});
                        })
                })
        } else {
            let url1 = "";
            let url2 = "";
            updatePost({url1, url2});
        }
    }

    // update blog post
    const updatePost = async ({url1, url2}) => {
        const updateRef = doc(db, "blogs", props.blogdata.id);
        if (title !== "") await setDoc(updateRef, { title: title }, { merge: true});
        if (name !== "") await setDoc(updateRef, { name: name }, { merge: true});
        if (desc !== "") await setDoc(updateRef, { desc: desc }, { merge: true});
        if (editor1 !== "") await setDoc(updateRef, { content: editor1 }, { merge: true});
        if (editor2 !== "") await setDoc(updateRef, { content2: editor2 }, { merge: true});
        if (url1 !== "") await setDoc(updateRef, { mainImg: url1 }, { merge: true});
        if (url2 !== "") await setDoc(updateRef, { secImg: url2 }, { merge: true});
        await setDoc(updateRef, { hideSecImg: isSecImg }, { merge: true});

        navigate("/");
        window.location.reload(false);
    };

    // upload images in the firebase storage
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

    // create blog post
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
            },
            hideSecImg: isSecImg,
            comments: []
        });
        navigate("/");
        window.location.reload(false);
    };

    return (
        <div className="createpage">
            <div className="create-titlebox">
                <div className="create-title">
                    <h1><Link className="create-titlelink" to="/admin">ADMIN</Link> BLOG {props.blogdata != null ? "UPDATE" : "BLOG CREATE"}</h1>
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
                    }} placeholder="title..." maxLength="74" id="title"/>

                    {/* NAME */}
                    <h2>Insert Your Name</h2>
                    <textarea className="name" onChange={(event) => {
                        setName(event.target.value);
                        setErrorMsg("");
                    }} placeholder="name..." maxLength="50" id="name"/>

                    {/* DESC */}
                    <h2>Insert Short Description</h2>
                    <textarea className="desc" onChange={(event) => {
                        setDesc(event.target.value);
                        setErrorMsg("");
                    }} placeholder="desc..." maxLength="130" id="desc"/>

                    <h2>Insert Content</h2>
                    <div className="check">
                        <input type="checkbox" id="check-stick1" name="check-stick1" onChange={(event) => {
                            event.target.checked ? setStick1("-side") : setStick1("");
                        }}/>
                        <label hrmlfor="check-stick1">Stick toolbar on the right side panel</label>
                    </div>
                    {   props.blogdata != null ?
                        <TextEditor stick={stick1} toggleEditor={toggleEditor1} content={props.blogdata.content}/> :
                        <TextEditor stick={stick1} toggleEditor={toggleEditor1}/> 
                    }

                    <h2>Insert Content After The Picture</h2>
                    <div className="check">
                        <input type="checkbox" id="check-stick2" name="check-stick2" onChange={(event) => {
                            event.target.checked ? setStick2("-side") : setStick2("");
                        }}/>
                        <label hrmlfor="check-stick2">Stick toolbar on the right side panel</label>
                    </div>
                    {   props.blogdata != null ?
                        <TextEditor stick={stick2} toggleEditor={toggleEditor2} content={props.blogdata.content2}/> :
                        <TextEditor stick={stick2} toggleEditor={toggleEditor2}/> 
                    }

                    { props.blogdata != null && <h1>Only upload images if you want new ones</h1>}

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

                    <div className="check">
                        <input type="checkbox" id="sec-img-check" name="sec-img-check" onChange={(event) => {
                            setIsSecImg(event.target.checked)
                        }}/>
                        <label hrmlfor="sec-img-check">I don't want the secondary image to appear in the blog</label>
                    </div>
                    
                    <h2 className="error">{errorMsg}</h2>
                    <button className="review-button" onClick={() => {
                        setPoppedUp(true);
                    }}>REVIEW BLOG</button>
                    {isPublishing ? publishing : <button onClick={() => {
                        props.blogdata != null ? updateImages() : uploadImages();
                    }} className="create-button">PUBLISH BLOG</button>}
                    
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