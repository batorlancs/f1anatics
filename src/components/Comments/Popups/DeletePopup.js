import React from "react";
import CloseIcon from "../../../pic/commenticons/delete.svg";

// --------------------------------------------------------------------------------------------------------------------------------
// Delete Comment Popup
// --------------------------------------------------------------------------------------------------------------------------------

function DeletePopup(props) {
    return (
        <div className="replypop-page">
            <div className="replypop">
                <div className="login-box1pop">
                    <button onClick={() => {
                        props.cancelDelete();
                    }}><img src={CloseIcon}></img></button>
                </div>
                <h2>Are you sure you want to delete your comment?</h2>
                <div className="reply-buttons">
                    <button className="reply-button-cancel" onClick={() => {
                        props.cancelDelete();
                    }}>Cancel</button>
                    <button className="reply-button-reply" onClick={() => {
                        if (props.deleteRepId !== "") {
                            props.deleteReply(props.deleteComId, props.deleteRepId);
                            props.refreshComments();
                        } else {
                            props.deleteComment(props.deleteComId, props.deleteReplies);
                        }
                        props.cancelDelete();
                    }}>Delete</button>
                </div>
            </div>
            <div className="replypop-back"></div>
        </div>
    )
}

export default DeletePopup;