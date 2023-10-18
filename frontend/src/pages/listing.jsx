import React, { useEffect, useState } from "react"

import Navbar from "../components/navbar.jsx"
import ListDisplay from "../components/listDisplay.jsx"
import ListReview from "../components/listReview.jsx"
import { useParams } from "react-router-dom"
import axios from "../api/axios.js"
import "./listing.css"

export default function Listing(props) {
    const { id } = useParams() //coaching services id

    // Linkage to backend
    const [specificListing, setSpecificListing] = useState(null);

    const fetchListingData = () => {
        axios.get(`/services/${id}`)
        .then((response) => {
            console.log("Received data:", response.data);
            setSpecificListing(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    };

    useEffect(() => {
        fetchListingData()
    }, [])
        

    return (
        <div>
            <Navbar />
            {specificListing ? (
                <>
                    <div className= "information-container">
                        <ListDisplay
                            key={`display_${specificListing.id}`}
                            item={specificListing}
                            fetchListingData = {fetchListingData}
                        />
                        <ListReview
                            key={`review_${specificListing.id}`}
                            item={specificListing}
                        />
                    </div>
                </>
            ) : (
                <p>Loading or not found...</p>
            )}
        </div>
        
    )
}