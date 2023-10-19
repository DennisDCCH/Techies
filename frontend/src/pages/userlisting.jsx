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
    const [message, setMessage] = useState(null);

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
            if(Array.isArray(response.data)) {
                setUserListing(response.data);
            } else {
                setUserListing([])
                setMessage(response.data.message);
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    useEffect(() => {
        fetchUserListing()
    }, []);

    let content 
    
    if(Array.isArray(userListing) && userListing.length > 0) {
        content = userListing.map((item) => {
            return (
                <Card2
                    key = {item.id}
                    item = {item}
                    fetchUserListing = {fetchUserListing}
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