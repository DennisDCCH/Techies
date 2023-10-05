import React from "react"
import { Link } from "react-router-dom"

import "./card3.css"



export default function Card3(props) {
    return (
        <div className = "card3">
            <h1 className = "card3-title">{props.item.name}</h1>
            <button className = "card3-select-button">
                <Link className = "card3-select-link">Select</Link>
            </button>
            <button className = "card3-delete-button">Delete</button>
        </div>
    )
}