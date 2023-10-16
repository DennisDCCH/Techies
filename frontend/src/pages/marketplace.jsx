import React, { useEffect, useState } from "react"
import axios from "axios"
// import axios from "../api/axios.js"

//temp data
import data from "../data/listing.js"
import Navbar from "../components/navbar.jsx"
import Card from "../components/card"
import Searchbar from "../components/searchbar.jsx"
import "./marketplace.css"

export default function Marketplace() {
    
    const [coachingServices, setCoachingServices] = useState([]);

    useEffect(() => {

        const API = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true,
        })

        API.interceptors.request.use((config) => {
            console.log(config.headers)
            return config
        })
        // Make a GET request to "/coaching_services" using Axios
        API.get("/coaching_services")
            .then((response) => {     
                // Assuming the response data is an array, update the state with the data
                console.log("Received data:", response.data);
                setCoachingServices(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const cards = data.map (item => {
        return (
            <Card
                key = {item.id}
                item = {item}
            />
        )
    })

    return (
        <div>
            <Navbar />
            <Searchbar />
            <section className="cards-list">
                {cards}
            </section>
        </div>
    )
}