import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { auth } from "../../Firebase";
import { doc, getDocs, setDoc , addDoc, collection, getDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";

import ProfilePic from "../../pic/profilepic.png";
import ArrowUpIcon from "../../pic/commenticons/up.svg";
import ArrowDownIcon from "../../pic/commenticons/down.svg";
import ReplyIcon from "../../pic/commenticons/reply.svg";
import PostIcon from "../../pic/commenticons/post.svg";
import Reply from "./Reply";
import "./Comments.css";

function Comments(props) {

    const [commentForm, setCommentForm] = useState("");
    const [replyForm, setReplyForm] = useState("");
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const [replyName, setReplyName] = useState("");
    const [replyId, setReplyId] = useState("");
    const [commentCount, setCommentCount] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        const getReplies = async (id) => {
            const data = await getDocs(collection(db, "blogs", props.blogid, "comments", id, "replies"));
            const newData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setComments(prev => (
                prev.map((com) => {
                    if (com.id === id) {
                        return {...com, replies: newData}
                    } else {
                        return {...com}
                    }
                })
            ))
        }
        const getComments = async () => {
            const data = await getDocs(collection(db, "blogs", props.blogid, "comments"));
            const newData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setComments(newData);
            newData.forEach((com) => {
                getReplies(com.id);
            })
        }
        getComments();
    }, [])

    useEffect(() => {
        let ctr = 0;
        ctr = comments.length;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].replies != null) {
                ctr+=comments[i].replies.length;
            }
        }
        setCommentCount(ctr);
    }, [comments])

    const like = async(commentid) => {

        if (auth.currentUser == null) {
            navigate("/login");
            return;
        }

        const commentRef = doc(db, "blogs", props.blogid, "comments", commentid);
        const docSnap = await getDoc(commentRef);
        const data = docSnap.data();
        let likeIDs = data.likeIDs;
        let votedBefore = likeIDs.indexOf(auth.currentUser.uid);

        if (votedBefore === -1) {
            likeIDs.push(auth.currentUser.uid);
            await setDoc(commentRef, {likes: data.likes + 1}, {merge: true});
        } else {
            likeIDs.splice(votedBefore, 1);
            console.log(votedBefore);
            await setDoc(commentRef, {likes: data.likes - 1}, {merge: true});
        }
        await setDoc(commentRef, { likeIDs: likeIDs}, {merge: true});
        window.location.reload(false);
    }

    const replylike = async(commentid, replyid) => {

        if (auth.currentUser == null) {
            navigate("/login");
            return;
        }

        const commentRef = doc(db, "blogs", props.blogid, "comments", commentid, "replies", replyid);
        const docSnap = await getDoc(commentRef);
        const data = docSnap.data();
        let likeIDs = data.likeIDs;
        let votedBefore = likeIDs.indexOf(auth.currentUser.uid);

        if (votedBefore === -1) {
            likeIDs.push(auth.currentUser.uid);
            await setDoc(commentRef, {likes: data.likes + 1}, {merge: true});
        } else {
            likeIDs.splice(votedBefore, 1);
            console.log(votedBefore);
            await setDoc(commentRef, {likes: data.likes - 1}, {merge: true});
        }
        await setDoc(commentRef, { likeIDs: likeIDs}, {merge: true});
        window.location.reload(false);
    }

    function likedBefore(arr) {
        if (auth.currentUser == null) {
            return false;
        }
        if (arr.indexOf(auth.currentUser.uid) !== -1) {
            return true;
        }
        return false;
    }

    function postComment() {
        if (auth.currentUser == null) {
            navigate("/login");
            return;
        }
        if (commentForm === "") {
            return;
        }
        addComment();
    }

    const addComment = async() => {
        const commentRef = doc(db, "blogs", props.blogid, "comments", uuid().slice(0, 18));
        await setDoc(commentRef, {
            name: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            text: commentForm,
            likes: 0,
            likeIDs: [],
            time: new Date().getTime()
        })
        window.location.reload(false);
    }

    function postReply(commentid, replyTo) {
        if (auth.currentUser == null) {
            navigate("/login");
            return;
        }
        if (replyForm === "") {
            return;
        }
        addReply(commentid, replyTo);
    }

    const addReply = async(commentid, replyTo) => {
        const replyRef = doc(db, "blogs", props.blogid, "comments", commentid, "replies", uuid().slice(0, 18));
        await setDoc(replyRef, {
            name: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            text: replyForm,
            likes: 0,
            likeIDs: [],
            time: new Date().getTime(),
            replyTo: replyTo
        })
        window.location.reload(false);
    }

    function cancelReply() {
        setReplyName("");
        setReplyId("");
    }

    // console.log(comments);

    return (
        <div className="compage">
            {replyName !== "" && <Reply name={replyName} id={replyId} cancelReply={cancelReply} postReply={postReply} setForm={setReplyForm}/>}
            <div className="com-postpage">
                <h1 className="com-title">Share your thoughts!</h1>
                <div className="com-post">
                    <input type="text" placeholder="Add a Comment..." className="com-post-text" onChange={(event) => {
                        setCommentForm(event.target.value);
                    }}/>
                    <button onClick={postComment}><img src={PostIcon}></img></button>
                </div>
            </div>
            <p className="com-desc">{commentCount} comment(s)</p>
            {comments.length > 0 && comments.map((com) => (
                <div className="com" key={com.id}>
                    <div className="com-main com-com">
                        <div className="com-picbox">
                            <img className="com-pic" src={ProfilePic}></img>
                        </div>
                        <div className="com-cont">
                            <div className="com-cont-top">
                                <h2>{com.name}</h2>
                                <h3>{props.calcPosted(com.time)}</h3>
                            </div>
                            <div className="com-cont-middle">
                                <p>{com.text}</p>
                            </div>
                            <div className="com-cont-bottom">
                                <p>{com.likes}</p>
                                <button className="com-cont-up" onClick={() => {like(com.id)}}>
                                    {likedBefore(com.likeIDs) ?
                                    <img src={ArrowDownIcon}></img> :
                                    <img src={ArrowUpIcon}></img>}
                                </button>
                                <button className="com-cont-reply" onClick={() => {
                                    if (auth.currentUser == null) {
                                        navigate("/login");
                                        return;
                                    }
                                    setReplyName(com.name);
                                    setReplyId(com.id);
                                }}><img src={ReplyIcon}></img>Reply</button>
                            </div>
                        </div>
                    </div>
                    
                    {com.replies != null && com.replies.map((reply) => (
                        <div className="com-reply com-com" key={reply.id}>
                            <div className="com-picbox">
                                <img className="com-pic" src={ProfilePic}></img>
                            </div>
                            <div className="com-cont">
                                <div className="com-cont-top">
                                    <h2>{reply.name}</h2>
                                    <h3>{props.calcPosted(reply.time)}</h3>
                                </div>
                                <div className="com-cont-middle">
                                    <p><span>@{reply.replyTo}</span> {reply.text}</p>
                                </div>
                                <div className="com-cont-bottom">
                                    <p>{reply.likes}</p>
                                    <button className="com-cont-up" onClick={() => {replylike(com.id, reply.id)}}>
                                        {likedBefore(reply.likeIDs) ?
                                        <img src={ArrowDownIcon}></img> :
                                        <img src={ArrowUpIcon}></img>}
                                    </button>
                                    <button className="com-cont-reply" onClick={() => {
                                        if (auth.currentUser == null) {
                                            navigate("/login");
                                            return;
                                        }
                                        setReplyName(com.name);
                                        setReplyId(com.id);
                                    }}><img src={ReplyIcon}></img>Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Comments;