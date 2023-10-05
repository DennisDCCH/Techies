import React from "react"
import { Link, Form, redirect } from "react-router-dom"
import LoginSidebar from "./loginSidebar"
import "./loginUI.css"

export default function loginUI() {
    return (
        <div className = "login-background"> 
            <LoginSidebar /> 
            <div className = "loginUI">
                <Form className = "login-form" method = "post" action = "/">
                    <h1 className = "login-form-text">Log-in</h1>
                    <div className = "login-form-username">
                        <label className = "login-form-username-text">Username</label>
                        <input className = "login-form-username-box" type = "username" name = "username"/>
                    </div>
                    <div className = "login-form-password"> 
                        <label className = "login-form-password-text">Password</label>
                        <input className = "login-form-password-box" type = "password" name = "password"/>
                    </div>
                    <Link className = "login-to-register" to = "/registration">Don't have an account? Register here!</Link>
                    <button className = "login-button" type = "submit">Log in</button>
                </Form>
            </div>
        </div> 
  )
}

export const loginAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        username: data.get("username"),
        password: data.get("password")
    }

    // send to backend submission to check username and password

    return redirect("/homepage")
}