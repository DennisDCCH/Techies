import React from "react"
import { Link } from "react-router-dom"
import "./card2.css"


export default function Card2(props) {
    return (
        <div className = "card2">
            <h1 className = "card2-title">{props.item.name}</h1>
            <button className = "card2-edit-button">
                <Link className = "card2-edit-link">Edit</Link>
            </button>
            <button className = "card2-delete-button">Delete</button>
        </div>
    )
}