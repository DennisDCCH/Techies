import React from "react"
import { Form, useActionData } from "react-router-dom"
import "./searchbar.css"
import FILTERLOGO from "../images/filter-logo.png"

export default function Searchbar() {
    const data = useActionData()
    
    return (
        <section>
            <div className="search">
                <input 
                    className = "search-box" 
                    type="text" 
                    placeholder="Enter your activity"
                    /* do functions based on change */
                />
            </div>
            <div className="nav-right">
                <div className="dropdown">
                    <img className = "filter-icon" src = {FILTERLOGO} alt = "filter-logo"/>
                        <Form className = "filter-form" method = "post" action = "/marketplace">
                            <div className = "dropdown-menu-sport">
                                <label className = "dropdown-menu-sport-text">Sport</label>
                                <input className = "dropdown-menu-sport-box" type = "text" name = "sport"></input>
                            </div>
                            <div className = "dropdown-menu-prof">
                                <label className = "dropdown-menu-prof-text">Proficiency</label>
                                <input className = "dropdown-menu-prof-box" type = "text" name = "prof"></input>
                            </div>
                            <div className = "dropdown-menu-price">
                                <label className = "dropdown-menu-price-text">Price</label>
                                <input className = "dropdown-menu-price-box" type = "number" name = "price"></input>
                            </div>

                            <button className = "filter-button" type = "submit">Select filter</button>
                            
                        </Form>
                </div>
            </div>
        </section>
    )
}