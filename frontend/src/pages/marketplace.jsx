import React from "react"

//temp data
import data from "../data/listing.js"
import Navbar from "../components/navbar"
import Card from "../components/card"
import "./marketplace.css"

export default function Marketplace() {
    const cards = data.map (item => {
        return (
            <Card
                id = {item.id}
                item = {item}
            />
        )
    })

    return (
        <div>
            <Navbar />
            <section className="cards-list">
                {cards}
            </section>
        </div>
    )
}