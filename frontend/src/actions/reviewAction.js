import { redirect } from "react-router-dom"
import axios from "../api/axios"

export const reviewAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        reviewMsg: data.get("reviewMsg"),
        rating: data.get("rate") !== null ? parseInt(data.get("rate")) : 0,
    }

    console.log(submission)
    try {
        const URL = `/review/${data.get("id")}`
        await axios.post(URL, submission)
        return null
    } catch (error) {
        console.log("Enter catch block")
        const errorMessage = error.response.data.message
        return errorMessage
    }
}