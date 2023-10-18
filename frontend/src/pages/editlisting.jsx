import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import data from "../data/user"
import list from "../data/one-list"

import Sidebar from "../components/sidebarmenu"
import ListInfo from "../components/listinfo"

import "./editlisting.css"
import axios from "../api/axios"

export default function EditListing() {
    const { id } = useParams()
    const [userData, setUserData] = useState([]);
    const [listingData, setListingData] = useState([])

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
        const URL = `/services/${id}`
        axios.get(URL)
        .then((response) => {
            setListingData(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [id])
    

    return (
        <div className = "editlist-container">
            <Sidebar 
                key = {`sidebar_${userData.id}`}
                item = {userData}
            />
            <div className = "editlist-form-container">
                <ListInfo
                    key = {listingData.id}
                    item = {listingData}
                />
            </div>
        </div>

    )
}