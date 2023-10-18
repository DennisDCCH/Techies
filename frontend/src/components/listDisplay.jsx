import React from "react"

import "./listDisplay.css"

export default function ListDisplay(props) {
    const handleBooking = async () => {
        try {
            const bookingURL = `/book/${props.item.id}`
            response = await axios.post(bookingURL)

            if(response.status === 200) {
                console.log("success")
                console.log(response.message)
            } else if (response.status === 404) {
                console.log(response.message)
            } else if (response.status === 400) {
                console.log(response.message)
            } else {
                console.log(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaving = async () => {
        try {
            const bookingURL = `/save/${props.item.id}`
            response = await axios.post(bookingURL)

            if(response.status === 200) {
                console.log("success")
                console.log(response.message)
            } else if (response.status === 404) {
                console.log(response.message)
            } else if (response.status === 400) {
                console.log(response.message)
            } else {
                console.log(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className = "listdisplay-container">
            <div className = "listdisplay-user">
                <div className = "listdisplay-user-container">
                    <img className = "listdisplay-service-picture" src = "/images/mountain-bike.png"/>
                    <span>insert username</span>
                </div>
                <div className = "listdisplay-user-bio">
                    <label className = "listdisplay-user-bio-label">Coach Bio</label>
                    <span className = "listdisplay-user-bio-box">insert bio</span>
                </div>
            </div>
            <div className = "listdisplay-service-container">
                <div className = "listdisplay-service-info">
                    <div className = "listdisplay-service-info-price">
                        <label>Price</label>
                        <span>insert price</span>
                    </div>
                    <div className = "listdisplay-service-info-location">
                        <label>Location</label>
                        <span>insert location</span>
                    </div>
                    <div className = "listdisplay-service-info-time">
                        <label>Time</label>
                        <span>insert time</span>
                    </div>
                    <div className = "listdisplay-service-info-sport">
                        <label>Sport</label>
                        <span>insert sport</span>
                    </div>
                    <div className = "listdisplay-service-info-proficiency">
                        <label>Proficiency</label>
                        <span>insert proficiency</span>
                    </div>
                    <div className = "listdisplay-service-info-availability">
                        <label>Availability</label>
                        <span>insert availability</span>
                    </div>
                </div>
                <div className = "listdisplay-serivce-description">
                    <label>Description</label>
                    <span>insert description</span>
                </div>
                <div className = "listdisplay-serivce-buttons">
                    <button onClick = {handleSaving}>Save Listing</button>
                    <button onClick = {handleBooking}>Book Listing</button>
                </div>
            </div>
        </div>
    )
}