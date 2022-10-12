import React from "react";
import "../../HomePage/BlogList.css";

// --------------------------------------------------------------------------------------------------------------------------------
// Preview of Blog Card in the home page
// --------------------------------------------------------------------------------------------------------------------------------

function CardPrev(props) {

    const blankTitle = "X XXX XXXX XX XXXXXX";
    const blankDesc = "xxxx x xxx xxxxx xxx xx xxxxxxx xxx xxxx xxx x xxxx x xxxxxx xxxxx x xxx xxxxx xxx xx xxxxxxx xxx xxxx xxx x xxxx x xxxxxx";

    return (
        <div className="cardprev">
            <div className="bloglist-cont-box">
                <div className="bloglist-cont-horz">
                    <div className="bloglist-cont-picbox-prev">
                    </div>
                    <div className="bloglist-cont-vert">
                        <h2 className="bloglist-cont-title">{props.title === "" ? blankTitle : props.title}</h2>
                        <p className="bloglist-cont-desc">{props.desc === "" ? blankDesc : props.desc}</p>
                        <button className="bloglist-cont-button">read more</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPrev;