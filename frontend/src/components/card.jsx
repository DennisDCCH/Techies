import React from "react"
import { Link } from "react-router-dom"
import Listing from "../pages/listing"
import "./card.css"


export default function Card(props) {
    console.log(props.item)
    const userImgSrc = props.item.coach.userImg !== "" ? `/images/${props.item.coach.userImg}` : "/images/human-logo.png"
    const coverImgSrc = props.item.coverImg !== "" ? `/images/${props.item.coverImg}` : "/images/listing-coverimg.png"
    return (
        <div className="card">
            <div className = "card-coach">
                <img className = "card-coach-img" src = {userImgSrc} alt = "coach-pic" />
                <h1 className = "card-coach-username">{props.item.coach.username}</h1>
            </div>
            <img className = "card-coverImg" src = {coverImgSrc} alt = "sport-pic"/>
            <h1 className = "card-sport">{props.item.sport} (${props.item.price})</h1>
            <button type="button" className="card-select-button">
                    <Link className = "card-select-button-link" to = {`/listing/${props.item.id}`}>Select Listing</Link>
            </button>
        </div>
    )
}