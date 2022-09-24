import React, { useEffect, useState } from "react";
import "./AllBlogs.css";

function AllBlogs(props) {

    const [blogsInOrder, setBlogsInOrder] = useState([]);

    // sort blogs in order
    useEffect(() => {
        setBlogsInOrder(props.blogs.sort((a, b) => b.key - a.key));
    }, [])

    return (
        <div className="allblogs">
            {blogsInOrder.slice(0, 100).map((blog) => {
                return (
                    <button>
                        <div className="allblogs-blog" key={blog.id}>
                            <div className="allblogs-box1">
                                <img className="allblogs-img" src={blog.mainImg}></img>
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
            {blogsInOrder.length % 2 === 1 && <div className="allblogs-odd"></div>}
        </div>
    )
}

export default AllBlogs;