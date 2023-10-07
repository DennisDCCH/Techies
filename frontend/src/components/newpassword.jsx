import React from "react"
import { Form, useActionData } from "react-router-dom"

import "./newpassword.css"


export default function NewPassword() {
    const data = useActionData()

    return (
        <div>
            <Form className = "changepw-form" method = "post" action = "/change-password">
                <h1 className = "changepw-form-title">Change Password</h1>
                <div className = "changepw-form-oldpw">
                    <label className = "changepw-form-oldpw-label">Old Password</label>
                    <input className = "changepw-form-oldpw-input" type = "password" name = "oldpw" required/>
                </div>
                <div className = "changepw-form-newpw">
                    <label className = "changepw-form-newpw-label">New Password</label>
                    <input className = "changepw-form-newpw-input" type = "password" name = "newpw" required/>
                </div>
                <div className = "changepw-form-newpw2">
                    <label className = "changepw-form-newpw2-label">Re-enter New Password</label>
                    <input className = "changepw-form-newpw2-input" type = "password" name = "newpw2" required/>
                </div>
                <button className = "changepw-form-button" type = "submit">Change Password</button>
            </Form>

            {data && data.error && <p className = "changepw-error">{data.error}</p>}
        </div>
    )
}