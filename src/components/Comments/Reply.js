import React from "react";
import "./Reply.css";

function Reply(props) {

    return (
        <div className="replypop-page">
            <div className="replypop">
                <h2>Reply to <span>@{props.name}</span></h2>
                <input type="text" placeholder="Add your Reply..." onChange={(event) => {
                    props.setForm(event.target.value);
                }}/>
                <div className="reply-buttons">
                    <button className="reply-button-cancel" onClick={props.cancelReply}>Cancel</button>
                    <button className="reply-button-reply" onClick={() => {
                        props.postReply(props.id, props.name);
                    }}>Reply</button>
                </div>
            </div>
            <div className="replypop-back"></div>
        </div>
    )
}

export default Reply;