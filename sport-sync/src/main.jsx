import React from "react"
import ReactDOM from "react-dom"
import Navbar from "./components/navbar.jsx"
import MainContent from "./components/mainContent.jsx"
import Footer from "./components/footer.jsx"

function Test() {
    return (
        <div>
            <Navbar />
            <MainContent />
            <Footer />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Test />)