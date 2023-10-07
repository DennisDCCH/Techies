import React from "react"
import { Form } from "react-router-dom"

import "./profileinfo.css"


export default function ProfileInfo(props) {
    return (
        <div>
            <h1 className = "profileinfo-title">Edit Profile</h1>
            <Form className = "profileinfo-form" method = "post" action = "/edit-profile">
                <div className = "profileinfo-form-username">
                    <label className = "profileinfo-form-username-label">Username</label>
                    <input className = "profileinfo-form-username-input" type = "text" name = "username" defaultValue = {props.item.username} />
                </div>
                <div className = "profileinfo-form-email">
                    <label className = "profileinfo-form-email-label">Email</label>
                    <input className = "profileinfo-form-email-input" type = "text" name = "email" defaultValue = {props.item.email} />
                </div>
                <div className = "profileinfo-form-dob">
                    <label className = "profileinfo-form-dob-label">Date of Birth</label>
                    <input className = "profileinfo-form-dob-input" type = "date" name = "dob" defaultValue = {props.item.dob} />
                </div>
                <p className = "profileinfo-form-text">Profile Picture</p>
                <hr/>
                <div className = "profileinfo-form-file">
                    <span className = "profileinfo-form-file-text">Select a file:</span>
                    <label className = "profileinfo-form-file-label">
                        <span>Choose file</span>
                        <input type = "file" name = "file" accept = "image/*"/>
                    </label>
                </div>
                <div className = "profileinfo-form-bio">
                    <label className = "profileinfo-form-bio-label">Bio</label>
                    <textarea className = "profileinfo-form-bio-input" type = "text" name = "bio" defaultValue = {props.item.bio} />
                </div>
                <button className = "profileinfo-form-button" type = "submit">Edit Profile</button>
            </Form>
        </div>
    )
}