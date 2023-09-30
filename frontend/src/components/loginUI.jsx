import React , { useState } from "react"
import { Link } from "react-router-dom"
import "./loginUI.css"

export default function loginUI() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        e.preventDefault();
        console.log(username)
        console.log(password)
    }

    return (
        <div className = "loginUI">
            <form className = "login-form" onSubmit = {handleSubmit}>
                <h1 className = "login-form-text">Log-in</h1>
                <div className = "login-form-username">
                    <label className = "login-form-username-text" htmlFor = "username">Username</label>
                    <input className = "login-form-username-box" value = {username} onChange = {(e) => setUsername(e.target.value)} type = "username" />
                </div>
                <div className = "login-form-password">
                    <label className = "login-form-password-text" htmlFor = "password">Password</label>
                    <input className = "login-form-password-box" value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" />
                </div>
                <Link className = "login-to-register" to = "/registration">Don't have an account? Register here!</Link>
                <button className = "login-button" type = "submit">Log in</button>
            </form>
        </div>
  )
}