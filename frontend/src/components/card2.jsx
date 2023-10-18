import React from "react"
import { Link } from "react-router-dom"
import "./card2.css"
import axios from "../api/axios"


export default function Card2(props) {
    const handleDelete = async () => {
        try {
            //Choosing which endpoint
            const deleteURL = `/services/${props.item.id}`

            console.log(deleteURL)
            // Send the DELETE request
            await axios.delete(deleteURL);
            props.updateListing();
            console.log(`Item with id ${props.item.id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    return (
        <div className = "card2">
            <h1 className = "card2-title">{props.item.sport}</h1>
            <button className = "card2-edit-button">
                <Link className = "card2-edit-link" to = {`/edit-listing/${props.item.id}`}>Edit</Link>
            </button>
            <button className = "card2-delete-button" onClick = {handleDelete}>Delete</button>
        </div>
    )
}