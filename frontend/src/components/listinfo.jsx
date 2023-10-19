import React from "react"
import { Form, useParams } from "react-router-dom"
import "./listinfo.css"

export default function ListInfo(props) {
    const { id } = useParams(); 
    const editActionURL = `/edit-listing/${id}`;
    return (
        <div className = "listinfo-container">
            <Form className = "listinfo-form" method = "post" action = {editActionURL}>
                <h1 className = "listinfo-form-title">Edit Listing</h1>
                <input type="hidden" name="id" value={props.item.id} />
                <div className = "listinfo-form-info">
                    <div className = "listinfo-form-price">
                        <label className = "listinfo-form-price-label">Price</label>
                        <input className = "listinfo-form-price-input" type = "number" name = "price" defaultValue = {props.item.price}/>
                    </div>
                    <div className = "listinfo-form-location">
                        <label className = "listinfo-form-location-label">Location</label>
                        <input className = "listinfo-form-location-input" type = "text" name = "location" defaultValue = {props.item.location}/>
                    </div>
                </div>
                <div className = "listinfo-form-datetime">
                    <label className = "listinfo-form-datetime-label">Date and Time</label>
                    <input className = "listinfo-form-datetime-input" type = "text" name = "datetime" defaultValue = {props.item.datetime}/>
                </div>
                <div className = "listinfo-form-sport"> 
                    <label className = "listinfo-form-sport-label">Sport</label>
                    <input className = "listinfo-form-sport-input" type = "text" name = "sport" defaultValue = {props.item.sport}/>
                </div>
                <div className = "listinfo-form-proficiency">
                    <label className = "listinfo-form-proficiency-label">Proficiency Level</label>
                    <select className = "listinfo-form-proficiency-option" name = "proficiency" defaultValue={props.item.proficiency}>
                        <option value = "Low">Low</option>
                        <option value = "Med">Medium</option>
                        <option value = "High">High</option>
                    </select>
                </div>
                <div  className = "listinfo-form-description">
                    <label className = "listinfo-form-description-label">Description</label>
                    <textarea className = "listinfo-form-description-input" type = "text" name = "description" defaultValue = {props.item.description}/>
                </div>
                <p className = "listinfo-form-text">Add a photo</p>
                <hr/>
                <div className = "listinfo-form-file">
                    <span className = "listinfo-form-file-text">Select a file:</span>
                    <label className = "listinfo-form-file-label">
                    <span>Choose file</span>
                    <input type = "file" name = "file" accept = "image/*"/>
                    </label>
                </div>
                <button className = "listinfo-form-button" type = "submit">Edit Listing</button>
            </Form>
        </div>
    )
}