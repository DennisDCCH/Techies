import React from "react"

import "./review.css"

export default function Review(props) {
    return (
        <div className = "review-container">
            <div className = "review-user">
                <div className = "review-user-container">
                    <img className = "review-userimg" src= {`/images/${props.item.reviewer.userImg}`} alt = "others-profile-pic"/>
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