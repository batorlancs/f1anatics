import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllBlogs.css";

// --------------------------------------------------------------------------------------------------------------------------------
// Show All Blogs in order (in a list)
// --------------------------------------------------------------------------------------------------------------------------------

function AllBlogs(props) {

    const [blogsInOrder, setBlogsInOrder] = useState([]);
    let navigate = useNavigate();

    // sort blogs in order
    useEffect(() => {
        setBlogsInOrder(props.blogs.sort((a, b) => b.key - a.key));
    }, [])

    return (
        <div className="allblogs">
            {blogsInOrder.slice(0, 100).map((blog) => {
                return (
                    <button key={blog.id} onClick={() => {
                        navigate(`/blog/${blog.id}`);
                    }}>
                        <div className="allblogs-blog">
                            <div className="allblogs-box1">
                                <img className="allblogs-img" src={blog.mainImg} alt="blog_image_preview"></img>
                            </div>
                            <div className="allblogs-box2">
                                <h1>{blog.title}</h1>
                                <h2>{blog.desc}</h2>
                                <p>Posted {props.calcPosted(blog.date.time)}</p>
                            </div>
                        </div>
                    </button>
                )
            })}
            {/* add a rectangle if the number of blogs is odd to fill in the space */}
            {blogsInOrder.length % 2 === 1 && <div className="allblogs-odd"></div>}
        </div>
    )
}

export default AllBlogs;