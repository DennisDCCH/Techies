import React from "react"
import { Link, useLocation } from "react-router-dom"

import "./card3.css"
import axios from "../api/axios";

export default function Card3(props) {
    const location = useLocation();
    const currentURL = location.pathname;

    const handleDelete = async () => {
        try {
            //Choosing which endpoint
            const deleteURL = currentURL === '/bookedlisting' ? `/booking/${props.item.id}` : `/save/${props.item.id}`;

            console.log(deleteURL)
            // Send the DELETE request
            await axios.delete(deleteURL);
            console.log(`Item with id ${props.item.id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
      }

    return (
        <div className = "card3">
            <h1 className = "card3-title">{props.item.name}</h1>
            <button className = "card3-select-button">
                <Link className = "card3-select-link" to = {`/listing/${props.item.id}`}>Select</Link>
                <Link className = "card3-select-link" to = {`/listing/${props.item.id}`}>Select</Link>
            </button>
            <button className = "card3-delete-button" onClick={handleDelete}>Delete</button>
            <button className = "card3-delete-button" onClick={handleDelete}>Delete</button>
        </div>
    )
}