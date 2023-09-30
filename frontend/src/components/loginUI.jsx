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
        <div>
            <form onSubmit = {handleSubmit}>
                <label htmlFor = "username">Username</label>
                <input value = {username} onChange = {(e) => setUsername(e.target.value)} type = "username" placeholder = "Username" />
                <label htmlFor = "password">Password</label>
                <input value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder = "Password" />
                <button type = "submit">Log In</button>
            </form>
            <button>
                <Link to = "/register">Don't have an account? Register here!</Link>
            </button>
        </div>
  )
}