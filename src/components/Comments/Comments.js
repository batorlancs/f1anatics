import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { auth } from "../../Firebase";
import { doc, getDocs, setDoc, collection, getDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";

import ProfilePic from "../../pic/profilepic.png";
import ArrowUpIcon from "../../pic/commenticons/up.svg";
import ArrowDownIcon from "../../pic/commenticons/down.svg";
import ReplyIcon from "../../pic/commenticons/reply.svg";
import PostIcon from "../../pic/commenticons/post.svg";
import DeleteIcon from "../../pic/commenticons/delete.svg";
import Reply from "./Reply";
import DeletePopup from "./Popups/DeletePopup";
import Login from "../Profile/Login";
import Signup from "../Profile/Signup";
import "./Comments.css";

// --------------------------------------------------------------------------------------------------------------------------------
// Commments for each individual Blog Page
// --------------------------------------------------------------------------------------------------------------------------------

function Comments(props) {

    const [commentForm, setCommentForm] = useState("");
    const [replyForm, setReplyForm] = useState("");
    const [comments, setComments] = useState([]);
    const [replyName, setReplyName] = useState("");
    const [replyId, setReplyId] = useState("");
    const [deleteComId, setDeleteComId] = useState("");
    const [deleteRepId, setDeleteRepId] = useState("");
    const [deleteReplies, setDeleteReplies] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [loginPop, setLoginPop] = useState(false);
    const [registerPop, setRegisterPop] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        refreshComments();
    }, [])

    // refresh all comments and replies on this blog
    function refreshComments() {
        const getReplies = async (id) => {
            const data = await getDocs(collection(db, "blogs", props.blogid, "comments", id, "replies"));
            const newData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            newData.sort((a, b) => a.time - b.time);
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
    }

    // count how many comments there are in total
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

    // like a comment
    const like = async(commentid) => {

        if (auth.currentUser == null) {
            setLoginPop(true)
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
        // window.location.reload(false);
        refreshComments();
    }

    // reply a comment that is reply to another comment
    const replylike = async(commentid, replyid) => {

        if (auth.currentUser == null) {
            setLoginPop(true);
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
        // window.location.reload(false);
        refreshComments();
    }

    // check if the user has liked the comment before
    function likedBefore(arr) {
        if (auth.currentUser == null) {
            return false;
        }
        if (arr.indexOf(auth.currentUser.uid) !== -1) {
            return true;
        }
        return false;
    }

    // post comment from the main form
    function postComment() {
        // check if user is logged in
        if (auth.currentUser == null) {
            setLoginPop(true);
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
            user: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL
            },
            text: commentForm,
            likes: 0,
            likeIDs: [],
            time: new Date().getTime()
        })
        // window.location.reload(false);
        refreshComments();
        document.getElementById("comment-input").value = "";
        setCommentForm("");
    }

    // add reply to the comment selected with the popup form
    function postReply(commentid, replyTo) {
        // check if user is logged in
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
            user: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL
            },
            text: replyForm,
            likes: 0,
            likeIDs: [],
            time: new Date().getTime(),
            replyTo: replyTo
        })
        setReplyName("");
        refreshComments();
    }

    const deleteReply = async(commentid, replyid) => {
        await deleteDoc(doc(db, "blogs", props.blogid, "comments", commentid, "replies", replyid));
    }

    const deleteComment = async(commentid, replies) => {
        replies.map((reply) => {
            deleteReply(commentid, reply.id);
        })
        await deleteDoc(doc(db, "blogs", props.blogid, "comments", commentid));
        refreshComments();
    }

    // popup functions

    function cancelReply() {
        setReplyName("");
        setReplyId("");
    }

    function cancelDelete() {
        setDeleteComId("");
        setDeleteRepId("");
        setDeleteReplies([]);
    }

    function cancelLoginPop() {
        setLoginPop(false);
        setRegisterPop(false);
    }

    function makeRegisterPop() {
        setRegisterPop(true);
        setLoginPop(false);
    }

    return (
        <div className="compage">
            {replyName !== "" && <Reply name={replyName} id={replyId} cancelReply={cancelReply} postReply={postReply} setForm={setReplyForm}/>}
            {deleteComId !== "" && <DeletePopup deleteComId={deleteComId} deleteRepId={deleteRepId} deleteReplies={deleteReplies} cancelDelete={cancelDelete} deleteComment={deleteComment} deleteReply={deleteReply} refreshComments={refreshComments}/>}
            {loginPop && <Login isPop={true} cancel={cancelLoginPop} register={makeRegisterPop}/>}
            {registerPop && <Signup isPop={true} cancel={cancelLoginPop}/>}
            <div className="com-postpage">
                <h1 className="com-title">Share your thoughts!</h1>
                <div className="com-post">
                    <input id="comment-input" type="text" placeholder="Add a Comment..." className="com-post-text" onChange={(event) => {
                        setCommentForm(event.target.value);
                    }}/>
                    <button onClick={postComment}><img src={PostIcon} alt="comment_post_icon"></img></button>
                </div>
            </div>
            <p className="com-desc">{commentCount} comment(s)</p>
            {/* COMMMENTS */}
            {comments.length > 0 && comments.map((com) => (
                <div className="com" key={com.id}>
                    <div className="com-main com-com">
                        <div className="com-picbox">
                            <img className="com-pic" src={com.user.photoURL != null ? com.user.photoURL : ProfilePic} alt="comment_profile_avatar"></img>
                        </div>
                        <div className="com-cont">
                            <div className="com-cont-top">
                                <h2>{com.user.name}</h2>
                                <h3>{props.calcPosted(com.time)}</h3>
                            </div>
                            <div className="com-cont-middle">
                                <p>{com.text}</p>
                            </div>
                            <div className="com-cont-bottom">
                                <p>{com.likes}</p>
                                <button className="com-cont-up" onClick={() => {like(com.id)}}>
                                    {likedBefore(com.likeIDs) ?
                                    <img src={ArrowDownIcon} alt="thumbs_up_notfilled"></img> :
                                    <img src={ArrowUpIcon} alt="thumbs_up_filled"></img>}
                                </button>
                                <button className="com-cont-reply" onClick={() => {
                                    if (auth.currentUser == null) {
                                        setLoginPop(true);
                                        return;
                                    }
                                    setReplyName(com.user.name);
                                    setReplyId(com.id);
                                }}><img src={ReplyIcon} alt="comment_reply_icon"></img>Reply</button>
                                {auth.currentUser !== null && auth.currentUser.uid === com.user.id && <button className="com-cont-reply" onClick={() => {
                                    setDeleteComId(com.id);
                                    setDeleteReplies(com.replies);
                                }}><img src={DeleteIcon} alt="comment-delete-icon"></img>Delete</button>}
                            </div>
                        </div>
                    </div>
                    {/* REPLIES */}
                    {com.replies != null && com.replies.map((reply) => (
                        <div className="com-reply com-com" key={reply.id}>
                            <div className="com-picbox">
                                <img className="com-pic" src={reply.user.photoURL} alt="reply_profile_avatar"></img>
                            </div>
                            <div className="com-cont">
                                <div className="com-cont-top">
                                    <h2>{reply.user.name}</h2>
                                    <h3>{props.calcPosted(reply.time)}</h3>
                                </div>
                                <div className="com-cont-middle">
                                    <p><span>@{reply.replyTo}</span> {reply.text}</p>
                                </div>
                                <div className="com-cont-bottom">
                                    <p>{reply.likes}</p>
                                    <button className="com-cont-up" onClick={() => {replylike(com.id, reply.id)}}>
                                        {likedBefore(reply.likeIDs) ?
                                        <img src={ArrowDownIcon} alt="thumbs_up_notfilled"></img> :
                                        <img src={ArrowUpIcon} alt="thumbs_up_filled"></img>}
                                    </button>
                                    <button className="com-cont-reply" onClick={() => {
                                        if (auth.currentUser == null) {
                                            setLoginPop(true);
                                            return;
                                        }
                                        setReplyName(reply.user.name);
                                        setReplyId(com.id);
                                    }}><img src={ReplyIcon} alt="reply_reply_icon"></img>Reply</button>
                                    {auth.currentUser !== null && auth.currentUser.uid === reply.user.id && <button className="com-cont-reply" onClick={() => {
                                        setDeleteComId(com.id);
                                        setDeleteRepId(reply.id);
                                    }}><img src={DeleteIcon} alt="reply-delete_icon"></img>Delete</button>}
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