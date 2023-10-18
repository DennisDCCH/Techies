import React, { useEffect, useState } from "react"

// temp data
import data from "../data/user.js"
import listing from "../data/listing.js"

//components
import Sidebar from "../components/sidebarmenu.jsx"
import Card3 from "../components/card3.jsx"

//css
import "./userbookedlisting.css"
import axios from "../api/axios.js"

export default function BookedListing() {
    const [userData, setUserData] = useState([]);
    const [userBooked, setUserBooked] = useState([]);
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

    useEffect(() => {
        axios.get("/user/booked")
        .then((response) => {
            if(Array.isArray(response.data)) {
                setUserBooked(response.data);
            } else {
                setMessage(response.data.message);
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    let content 
    
    if(Array.isArray(userBooked) && userBooked.length > 0) {
        content = userBooked.map((item) => {
            <Card3
                key = {item.id}
                item = {item}
            />
        })
    } else {
        content = <p>{message}</p>;
    }

    return (
        <div className = "bookedlisting-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "bookedlisting">
                <h1 className = "bookedlisting-title">Booked Listing</h1>
                <section className = "bookedlisting-list">
                    {content}
                </section>
            </div>
        </div>
        
    )
}