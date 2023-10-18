import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
//components
import Sidebar from "../components/sidebarmenu"
import Card2 from "../components/card2.jsx"

//css
import "./userlisting.css"
import axios from "../api/axios.js"


export default function MyListing() {
    const [userData, setUserData] = useState([]);
    const [userListing, setUserListing] = useState([]);

    useEffect(() => {
        axios.get("/user")
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    const fetchUserListing = () => {
        axios.get("/user/listings")
        .then((response) => {
            setUserListing(response.data); 
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    useEffect(() => {
        fetchUserListing();
    }, []);

    let content 
    
    if(Array.isArray(userListing) && userListing.length > 0) {
        content = userListing.map((item) => {
            return (
                <Card2
                    key = {item.id}
                    item = {item}
                    updateListing = {fetchUserListing}
                />
            )
        })
    } else {
        content = <p>You have not created any listing</p>;
    }


    return (
        <div className = "mylisting-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "mylisting">
                <h1 className = "mylisting-title">My Listing</h1>
                <section className = "mylisting-list">
                    {content}
                </section>
                <button className = "mylisting-newlist-button">
                    <Link className = "mylisting-newlist-link" to = "/create">Create New Listing</Link>
                </button>
            </div>
        </div>
        
    )
}