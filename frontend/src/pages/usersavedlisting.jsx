import React, { useEffect, useState } from "react"

// temp data
import data from "../data/user.js"
import listing from "../data/listing.js"

//components
import Sidebar from "../components/sidebarmenu"
import Card3 from "../components/card3.jsx"

//css
import "./usersavedlisting.css"
import axios from "../api/axios.js"

export default function SavedListing() {
    const [userData, setUserData] = useState([]);
    const [userSaved, setUserSaved] = useState([]);
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
        console.log("fetching user saved")
        axios.get("/user/saved")
        .then((response) => {
            console.log(response.data)
            if(Array.isArray(response.data)) {
                setUserSaved(response.data);
            } else {
                setUserSaved([])
                setMessage(response.data.message);
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    useEffect(() => {
        fetchUserListing();
    }, []);

    let content 
    
    if(Array.isArray(userSaved) && userSaved.length > 0) {
        content = userSaved.map((item) => {
            return (
                <Card3
                    key = {item.id}
                    item = {item}
                    updateListing = {fetchUserListing}
                />
            )
        })
    } else {
        content = <p>{message}</p>;
    }

    return (
        <div className = "savedlisting-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "savedlisting">
                <h1 className = "savedlisting-title">Saved Listing</h1>
                <section className = "savedlisting-list">
                    {content}
                </section>
            </div>
        </div>
        
    )
}