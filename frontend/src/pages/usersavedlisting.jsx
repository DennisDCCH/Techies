import React from "react"

// temp data
import data from "../data/user.js"
import listing from "../data/listing.js"

//components
import Sidebar from "../components/sidebarmenu"
import Card3 from "../components/card3.jsx"

//css
import "./usersavedlisting.css"

export default function SavedListing() {
    const cards = listing.map (item => {
        return (
            <Card3
                id = {item.id}
                item = {item}
            />
        )
    })

    return (
        <div className = "savedlisting-container">
            <Sidebar 
                key = {data.id}
                item = {data}
            />
            <div className = "savedlisting">
                <h1 className = "savedlisting-title">Saved Listing</h1>
                <section className = "savedlisting-list">
                    {cards}
                </section>
            </div>
        </div>
        
    )
}