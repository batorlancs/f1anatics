import React from "react";
import "./Reply.css";
import CloseIcon from "../../pic/commenticons/delete.svg";

// --------------------------------------------------------------------------------------------------------------------------------
// Reply Pop Up
// --------------------------------------------------------------------------------------------------------------------------------

function Reply(props) {

    return (
        <div className="replypop-page">
            <div className="replypop">
                <div className="login-box1pop">
                        <button onClick={() => {
                            props.cancelReply();
                        }}><img src={CloseIcon}></img></button>
                </div>
                <div className="replypop-title">
                    <h2>Reply to <br/><span>@{props.name}</span></h2>
                </div>
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