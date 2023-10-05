import React from "react"
// temp data
import data from "../data/user.js"
import Sidebar from "../components/sidebarmenu"
import "./userlisting.css"

export default function MyListing() {
    return (
        <div className = "mylisting-container">
            <Sidebar 
                key = {data.id}
                item = {data}
            />
            <h1>MY LISTING PAGE</h1>
        </div>
        
    )
}