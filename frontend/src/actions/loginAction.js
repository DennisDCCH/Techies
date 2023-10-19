import { redirect } from "react-router-dom"
import axios from "../api/axios"

const LOGIN_URL = '/login'
export const loginAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        username: data.get("username"),
        password: data.get("password")
    }

    console.log(submission)

    try {
        const response = await axios.post(LOGIN_URL, submission);

        if (response.status === 200) {

            console.log(response.data.access_token)
            return redirect("/homepage");
        } else {
            // Handle other response statuses as needed
            return { error: "Login failed" };
        }
    } catch (error) {
        // Handle any Axios request error, such as network issues or server unavailability
        console.log(error)
        const errorMessage = error.response.data.message
        return { error: errorMessage };
    }
}