import React, { useEffect, useState, useContext, useRef } from "react"
import { Link, Form, redirect, useActionData } from "react-router-dom"
import LoginSidebar from "./loginSidebar"
import "./loginUI.css"

export default function loginUI() {
    const data = useActionData()
    return (
        <div className = "login-background"> 
            <LoginSidebar /> 
            <div className = "loginUI">
                <Form className = "login-form" method = "post" action = "/">
                    <h1 className = "login-form-text">Log-in</h1>
                    <div className = "login-form-username">
                        <label className = "login-form-username-text">Username</label>
                        <input 
                            className = "login-form-username-box" 
                            type = "text" 
                            name = "username" 
                            required/>
                    </div>
                    <div className = "login-form-password"> 
                        <label className = "login-form-password-text">Password</label>
                        <input 
                            className = "login-form-password-box" 
                            type = "password" 
                            name = "password" 
                            required
                        />
                    </div>
                    <Link className = "login-to-register" to = "/registration">Don't have an account? Register here!</Link>
                    <button className = "login-button" type = "submit">Log in</button>

                    {data && data.error && <p className = "login-error">{data.error}</p>}

                </Form>
            </div>
        </div> 
    )
}