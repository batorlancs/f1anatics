import React from "react";
import "../../Blog.css";

function BlogPrev(props) {

    const blankTitle = "xxxx xxx xxxxxx x xxxxxx xx xxxxxxxx xx xxxx";
    const blankName = "xxxxx xxxxxxx";
    const blankText = <div className="blog-text">xxxxxx xxx x xxxx xxxx xx xxx xxx xxxxxx xxxxx xxx x x xxxx xxxx xx x xx x xx xxxxxx xxxxx xxxx xx xxxx xxxxxxxxx xxxxx xxxx xxx xxxxxxx  xxxxxx xxx x xxxx xxxx xx xxx xxx xxxxxx xxxxx xxx x x xxxx xxxx xx x xx x xx xxxxxx xxxxx xxxx xx xxxx xxxxxxxxx xxxxx xxxx xxx xxxxxxx  xxxxxx xxx x xxxx xxxx xx xxx xxx xxxxxx xxxxx xxx x x xxxx xxxx xx x xx x xx xxxxxx xxxxx xxxx xx xxxx xxxxxxxxx xxxxx xxxx xxx xxxxxxx  xxxxxx xxx x xxxx xxxx xx xxx xxx xxxxxx xxxxx xxx x x xxxx xxxx xx x xx x xx xxxxxx xxxxx xxxx xx xxxx xxxxxxxxx xxxxx xxxx xxx xxxxxxx</div>;

    return (
        <div className="blog">
            <div className="blogprev-mainimgbox">
                <div className="blog-mainimgbox-cont">
                    <h1 className="blog-title">{props.title === "" ? blankTitle : props.title}</h1>
                    <h3 className="blog-date">2022.04.03.</h3>
                </div>
            </div>
            <div className="blog-contentbox">
                {/* <div className="blog-content">{props.content.split("\n").map((par) => {
                    return (
                        <div className="blog-text">
                            <p>{par}</p>
                            <br></br>
                        </div>    
                    )
                })}</div> */}
                <div className="blog-content">{props.content === "" ? blankText : props.content.split("\n").map((par) => {
                    return (
                        <div className="blog-text">
                            <p>{par}</p>
                            <br></br>
                        </div>    
                    )
                })}</div>
                <div className="blogprev-secimgbox"></div>
                <div className="blog-content">{props.content2 === "" ? blankText : props.content2.split("\n").map((par) => {
                    return (
                        <div className="blog-text">
                            <p>{par}</p>
                            <br></br>
                        </div>
                    )
                })}</div>
                <h2 className="blog-name"><span>written by </span>{props.name === "" ? blankName : props.name}</h2>
            </div>
            
        </div>
    )
}

export default BlogPrev;