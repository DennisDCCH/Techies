import React, { useEffect, useState } from "react"
import Navbar from "../components/navbar.jsx"
import HomepageContent from "../components/homepageContent.jsx"
import Footer from "../components/footer.jsx"
import axios from "../api/axios.js"

export default function Homepage() {

    const [notification, setNotification] = useState(true)

    useEffect(() => {
        axios.get("/homepage")
            .then((response) => {
                console.log(response.data)
                console.log(response.data.overallNotification)
                setNotification(response.data.overallNotification)
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    })

    return (
        <div>
            <Navbar 
                notification = {notification}
            />
            <HomepageContent />
            <Footer />
        </div>
    )
}