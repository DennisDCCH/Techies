import React from "react"
// temp data
import data from "../data/user.js"
import Sidebar from "../components/sidebarmenu.jsx"
import "./userbookedlisting.css"

export default function BookedListing() {
    return (
        <div className = "bookedlisting-container">
            <Sidebar 
                key = {data.id}
                item = {data}
            />
            <h1>BOOKED LISTING PAGE</h1>
        </div>
        
    )
}