import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// temp data
import data from "../data/user.js"
import listing from "../data/listing.js"

//components
import Sidebar from "../components/sidebarmenu"
import Card2 from "../components/card2.jsx"

//css
import "./userlisting.css"
import axios from "../api/axios.js"


export default function MyListing() {
    const [userData, setUserData] = useState([]);
    const [userListing, setUserListing] = useState([])

    useEffect(() => {
        axios.get("/user")
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    const cards = listing.map (item => {
        return (
            <Card2
                key = {item.id}
                item = {item}
            />
        )
    })

    return (
        <div className = "mylisting-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "mylisting">
                <h1 className = "mylisting-title">My Listing</h1>
                <section className = "mylisting-list">
                    {cards}
                </section>
                <button className = "mylisting-newlist-button">
                    <Link className = "mylisting-newlist-link" to = "/create">Create New Listing</Link>
                </button>
            </div>
        </div>
        
    )
}