import React, { useEffect, useState } from "react"
import { Form, useActionData, useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import STARLOGO from "../images/star-logo.png"
import Review from "./review.jsx"
import "./listReview.css"

export default function ListReview(props) {
    const userImgSrc = props.item.coach.userImg !== "" ? `images/${props.item.coach.userImg}` : "images/human-logo.png";
    const [rating, setRating] = useState(null)
    const [rateColor, setRateColor] = useState(null)
    const { id } = useParams()

    const handleSubmit = () => {
        setTimeout(() => {
            props.fetchListingData();
        }, 500);
    }

    const reviews = props.item.reviews.map (item => {
        return (
            <div>
                <Review
                key = {item.id}
                item = {item}
                />
                <hr />
            </div>
        )
    })

    return (
        <div className = "listreview-container">
            <div className = "listreview-overall">
                <div className = "listreview-overall-user">
                    <img className = "listreview-overall-userimg" src = {userImgSrc} alt = "user-profile-pic"/>
                    <span className = "listreview-overall-username">{props.item.coach.username}</span>
                </div>
                <div className = "listreview-overall-stats">
                    <span className = "listreview-overall-stats-rating">{props.item.overallRating.toFixed(2)}</span>
                    <img className = "listreview-overall-stats-star" src = {STARLOGO} alt = "star-logo"/>
                    <span className = "listreview-overall-stats-count">[{props.item.numReviews}]</span>
                </div>
            </div>
            <div className = "listreview-individual">
                <h1 className = "listreview-individual-title">All Reviews ({props.item.numReviews})</h1>
                <div className = "listreview-reviews-container">
                    {reviews}
                </div>
                <Form className = "listreview-input" method = "post" action = {`/listing/${id}`}>
                    <input type = "hidden" name = "id" value = {props.item.id} />
                    <input className = "listreview-individual-input" type = "text" name = "reviewMsg" placeholder = "Add Comments" required/>
                    <div className = "listreview-miscallenous">
                        {[...Array(5)].map((star, index) => {
                            const currentRate = index + 1
                            return (
                                <>
                                    
                                    <label>
                                        <input type = "radio" name = "rate" 
                                            value = {currentRate}
                                            onClick={() => setRating(currentRate === rating ? 0 : currentRate)}
                                        />
                                        <FaStar size = {40}
                                            color = { currentRate <= (rateColor || rating) ? "yellow" : "grey"}
                                        />
                                    </label>
                                </>
                            )
                        })}
                        <button type = "submit" onClick={handleSubmit}>Add Review</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}