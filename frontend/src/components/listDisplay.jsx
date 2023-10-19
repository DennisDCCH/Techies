import React, { useState } from "react"

import "./listDisplay.css"
import axios from "../api/axios"

export default function ListDisplay(props) {
    const [content, setContent] = useState(null)

    const handleBooking = async () => {
        try {
            const bookingURL = `/book/${props.item.id}`
            const response = await axios.post(bookingURL)

            if(response.status === 200) {
                console.log("success")
                console.log(response.message)
                setContent(<span>You have successfully booked this listing</span>)
                props.fetchListingData()
            } else if (response.status === 404) {
                console.log(response.message)
            } else if (response.status === 400) {
                console.log(response.message)
                setContent(<p>You have booked this listing already</p>)
            } else {
                console.log(response.message)
            }
        } catch (error) {
            console.log("Error", error)
            setContent(error.response.data.message)
        }
    }

    const handleSaving = async () => {
        try {
            const bookingURL = `/save/${props.item.id}`
            const response = await axios.post(bookingURL)

            if(response.status === 200) {
                console.log("success")
                console.log(response.message)
                setContent(<p>You have successfully saved this listing</p>)
            } else if (response.status === 404) {
                console.log(response.message)
            } else if (response.status === 400) {
                console.log(response.message)
                setContent(<p>You have saved this listing already</p>)
            } else {
                console.log(response.message)
            }
        } catch (error) {
            console.log(error.response.data)
            setContent(error.response.data.message)
        }
    }

    return (
        <div className = "listdisplay-container">
            <div className = "listdisplay-user">
                <div className = "listdisplay-user-container">
                    <img className = "listdisplay-service-picture" src = {`/images/${props.item.coverImg}`}/>
                    <span>{props.item.coach.username}</span>
                </div>
                <div className = "listdisplay-user-bio">
                    <label className = "listdisplay-user-bio-label">Coach Bio</label>
                    <span className = "listdisplay-user-bio-box">{props.item.coach.bio}</span>
                </div>
            </div>
            <div className = "listdisplay-service-container">
                <div className = "listdisplay-service-info">
                    <div className = "listdisplay-service-info-price">
                        <label>Price</label>
                        <span>{props.item.price}</span>
                    </div>
                    <div className = "listdisplay-service-info-location">
                        <label>Location</label>
                        <span>{props.item.location}</span>
                    </div>
                    <div className = "listdisplay-service-info-time">
                        <label>Time</label>
                        <span>{props.item.datetime}</span>
                    </div>
                    <div className = "listdisplay-service-info-sport">
                        <label>Sport</label>
                        <span>{props.item.sport}</span>
                    </div>
                    <div className = "listdisplay-service-info-proficiency">
                        <label>Proficiency</label>
                        <span>{props.item.proficiency}</span>
                    </div>
                    <div className = "listdisplay-service-info-availability">
                        <label>Availability</label>
                        <span>{props.item.available}</span>
                    </div>
                </div>
                <div className = "listdisplay-serivce-description">
                    <label>Description</label>
                    <span>{props.item.description}</span>
                    
                </div>
                <div className = "listdisplay-serivce-buttons">
                    <button onClick = {handleSaving}>Save Listing</button>
                    <button onClick = {handleBooking}>Book Listing</button>
                    
                </div>
                {content}
            </div>
        </div>
    )
}