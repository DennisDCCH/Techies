import React from "react"
import Navbar from "../components/navbar.jsx"
import HomepageContent from "../components/homepageContent.jsx"
import Footer from "../components/footer.jsx"

export default function Homepage() {
    return (
        <div>
            <Navbar />
            <HomepageContent />
            <Footer />
        </div>
    )
}