import React from "react"
import { Form } from "react-router-dom"
import "./newlist.css"

export default function NewListing() {
    return (
        <div className = "create-container">
            <Form className = "create-form" method = "post" action = "/create">
                <h1 className = "create-form-title">New Listing</h1>
                <div className = "create-form-info">
                    <div className = "create-form-price">
                        <label className = "create-form-price-label">Price</label>
                        <input className = "create-form-price-input" type = "text" name = "price" placeholder = "$50/hr" required/>
                    </div>
                    <div className = "create-form-location">
                        <label className = "create-form-location-label">Location</label>
                        <input className = "create-form-location-input" type = "text" name = "location" required/>
                    </div>
                </div>
                <div className = "create-form-datetime">
                    <label className = "create-form-datetime-label">Date and Time</label>
                    <input className = "create-form-datetime-input" type = "text" name = "datetime" placeholder = "Tuesday, 5-7pm" required/>
                </div>
                <div className = "create-form-sport">
                    <label className = "create-form-sport-label">Sport</label>
                    <input className = "create-form-sport-input" type = "text" name = "sport" required/>
                </div>
                <div className = "create-form-proficiency">
                    <label className = "create-form-proficiency-label">Proficiency Level</label>
                    <select className = "create-form-proficiency-option" name = "proficiency" required>
                        <option value = "" disable selected>Select an option</option>
                        <option value = "low">Low</option>
                        <option value = "med">Medium</option>
                        <option value = "high">High</option>
                    </select>
                </div>
                <div  className = "create-form-description">
                    <label className = "create-form-description-label">Description</label>
                    <textarea className = "create-form-description-input" type = "text" name = "description" required/>
                </div>
                <p className = "create-form-text">Add a photo</p>
                <hr/>
                <div className = "create-form-file">
                    <span className = "create-form-file-text">Select a file:</span>
                    <label className = "create-form-file-label">
                    <span>Choose file</span>
                    <input type = "file" name = "file" accept = "image/*" required/>
                    </label>
                </div>
                <button className = "create-form-button" type = "submit">Create Listing</button>
            </Form>
        </div>
    )
}