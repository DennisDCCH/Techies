import React from "react"
import data from "../data/listing.js"
import Navbar from "../components/navbar"
import Card from "../components/card"

export default function Marketplace() {
    return (
        <div>
            <Navbar />
            <Card
                id = {data.id}
                item = {data}
            />
        </div>
    )
}