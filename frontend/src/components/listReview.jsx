import React, { useState } from "react"
import { Form, useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import STARLOGO from "../images/star-logo.png"

import data from "../data/review.js"
import Review from "./review.jsx"
import "./listReview.css"

export default function ListReview(props) {

    const [rating, setRating] = useState(null)
    const [rateColor, setRateColor] = useState(null)
    const { id } = useParams()

    const reviews = data.reviews.map (item => {
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
                    <img className = "listreview-overall-userimg" src = "/images/muchacho.png" alt = "user-profile-pic"/>
                    <span className = "listreview-overall-username">Muchacho</span>
                </div>
                <div className = "listreview-overall-stats">
                    <span className = "listreview-overall-stats-rating">{data.overallRating}</span>
                    <img className = "listreview-overall-stats-star" src = {STARLOGO} alt = "star-logo"/>
                    <span className = "listreview-overall-stats-count">[{data.numReviews}]</span>
                </div>
            </div>
            <div className = "listreview-individual">
                <h1 className = "listreview-individual-title">All Reviews ({data.numReviews})</h1>
                <div className = "listreview-reviews-container">
                    {reviews}
                </div>
                <Form className = "listreview-input" method = "post" action = {`/listing/${id}`}>
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
                        <button type = "submit">Add Review</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}