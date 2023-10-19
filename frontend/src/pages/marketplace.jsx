import React, { useEffect, useState } from "react"
import axios from "../api/axios.js"

//temp data
import data from "../data/listing.js"
import Navbar from "../components/navbar.jsx"
import Card from "../components/card"
import Searchbar from "../components/searchbar.jsx"
import "./marketplace.css"

export default function Marketplace() {
    
    const [coachingServices, setCoachingServices] = useState([]);

    useEffect(() => {
        // Make a GET request to "/coaching_services" using Axios
        axios.get("/coaching_services")
            .then((response) => {     
                // Assuming the response data is an array, update the state with the data
                console.log("Received data:", response.data);
                setCoachingServices(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        axios.get("/coaching_services_filter")
        .then((response) => {
            console.log("Received data:", response.data);
            setCoachingServices(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        })
    }, []);

    let content 

    if(coachingServices.length != 0) {
        content = coachingServices.map (item => {
            return (
                <Card
                    key = {item.id}
                    item = {item}
                />
            )
        })
    } else {
        content = <p>Currently there is no services</p>
    }

    

    return (
        <div>
            <Navbar />
            <Searchbar 
  
            />
            <section className="cards-list">
                {content}
            </section>
        </div>
    )
}