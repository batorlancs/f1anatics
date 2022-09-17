import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db , storage } from "../../Firebase";
import "./Delete.css";

function Delete(props) {

    let navigate = useNavigate();
    const [blogsInOrder, setBlogsInOrder] = useState([]);
    const [deleteBlogId, setDeleteBlogId] = useState("");
    const [deleteBlogKey, setDeleteBlogKey] = useState("");

    // console.log(deleteBlogKey);

    // sort blogs in order
    useEffect(() => {
        setBlogsInOrder(props.blogs.sort((a, b) => b.key - a.key));
    }, [])

    function deleteBlogPictures(id, key) {
        // Create a reference to the file to delete
        const mainRef = ref(storage, `images/${key}/main.png`);
        const secRef = ref(storage, `images/${key}/secondary.png`)
        // Delete the file
        deleteObject(mainRef).then(() => {
        // File deleted successfully
            deleteObject(secRef).then(() => {
                // File deleted successfully
                    console.log("all blog pictures deleted");
                    deleteBlog(id);
                }).catch((error) => {
                // Uh-oh, an error occurred!
                    console.log("error deleting secondary picture");
                    console.log(`images/${key}/secondary.png`);
                });
        }).catch((error) => {
        // Uh-oh, an error occurred!
            console.log("error deleting main picture");
            console.log(`images/${key}/main.png`);
        });
    }

    async function deleteBlog(id) {
        await deleteDoc(doc(db, 'blogs', id));
        setDeleteBlogId("");
        setDeleteBlogKey("");
        window.location.reload();
    }


    return (
        <div className="delete">
            <div className="delete-titlebox">
                <div className="delete-title">
                    <h1><Link className="delete-titlelink" to="/admin">ADMIN</Link> BLOG DELETE</h1>
                    <p>Here you can delete any blogs in the database. Deleted blogs will be gone forever.</p>
                </div>
            </div>
            <div className="delete-cont">
                {blogsInOrder.slice(0, 100).map((blog) => {
                    return (
                        <div className="delete-cont-box" key={blog.id}>
                            <h2 className="delete-cont-title">{blog.title}</h2>
                            <div className="delete-cont-buttons">
                                <button onClick={() => {
                                    navigate(`/blog/${blog.id}`);
                                }} className="delete-cont-button1">check blog</button>
                                <button onClick={() => {
                                    setDeleteBlogId(blog.id);
                                    setDeleteBlogKey(blog.key);
                                }} className="delete-cont-button2">delete blog</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {deleteBlogId !== "" &&
            <div className="popup">
                <div className="popup-box">
                    <h3>Are you sure you want to delete the blog?</h3>
                    <p>it will be gone forever, if you do so</p>
                    <button className="popup-cancel" onClick={() => {
                        setDeleteBlogId("");
                        setDeleteBlogKey("");
                    }}>cancel</button>
                    <button className="popup-delete" onClick={() => {
                        
                        deleteBlogPictures(deleteBlogId, deleteBlogKey);
                        
                    }}>delete</button>
                </div>
                <div className="popup-back"></div>
            </div>}
        </div>
    )
}

export default Delete;