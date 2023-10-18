import React, { useEffect, useState } from "react"

//temp data
import data from "../data/user"

//components
import Sidebar from "../components/sidebarmenu"
import NewListing from "../components/newlist"

//css
import "./createlisting.css"
import axios from "../api/axios"

export default function CreateListing() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get("/user")
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    return (
        <div className = "create-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "create-form-container">
                <NewListing />
            </div>
        </div>
        
    )
}