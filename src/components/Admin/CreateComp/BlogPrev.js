import React from "react";
import uuid from "react-uuid";
import "../../Blog.css";

// --------------------------------------------------------------------------------------------------------------------------------
// Preview of blog
// --------------------------------------------------------------------------------------------------------------------------------

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

                { props.editor1 ? 
                <div className="blog-editor" dangerouslySetInnerHTML={{__html: props.editor1}}></div> :
                blankText }
                
                <div className="blogprev-secimgbox"></div>

                { props.editor2 ? 
                <div className="blog-editor" dangerouslySetInnerHTML={{__html: props.editor2}}></div> :
                blankText }

                <h2 className="blog-name"><span>written by </span>{props.name === "" ? blankName : props.name}</h2>
            </div>
            
        </div>
    )
}

export default BlogPrev;