import React from "react"

// temp data
import data from "../data/user.js"
import listing from "../data/listing.js"

//components
import Sidebar from "../components/sidebarmenu.jsx"
import Card3 from "../components/card3.jsx"

//css
import "./userbookedlisting.css"

export default function BookedListing() {
    const cards = listing.map (item => {
        return (
            <Card3
                id = {item.id}
                item = {item}
            />
        )
    })

    return (
        <div className = "bookedlisting-container">
            <Sidebar 
                key = {data.id}
                item = {data}
            />
            <div className = "bookedlisting">
                <h1 className = "bookedlisting-title">Booked Listing</h1>
                <section className = "bookedlisting-list">
                    {cards}
                </section>
            </div>
        </div>
        
    )
}