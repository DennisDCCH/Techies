import React from "react"
// temp data
import data from "../data/user.js"
import Sidebar from "../components/sidebarmenu"
import "./usersavedlisting.css"

export default function SavedListing() {
    return (
        <div className = "savedlisting-container">
            <Sidebar 
                key = {data.id}
                item = {data}
            />
            <h1>SAVED LISTING PAGE</h1>
        </div>
        
    )
}