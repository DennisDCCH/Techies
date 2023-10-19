import React from "react"

import "./review.css"

export default function Review(props) {
    const userImgSrc = props.item.reviewer.userImg !== "" ? `/images/${props.item.reviewer.userImg}` : "/images/human-logo.png";
    return (
        <div className = "review-container">
            <div className = "review-user">
                <div className = "review-user-container">
                    <img className = "review-userimg" src= {userImgSrc} alt = "others-profile-pic"/>
                    <span className = "review-username">{props.item.reviewer.username}</span>
                </div>
                <span className = "review-message">{props.item.reviewMsg}</span>
            </div>
            <div>
                <span className = "review-rating">{props.item.rating}/5</span>
            </div>
        </div>

    )
}