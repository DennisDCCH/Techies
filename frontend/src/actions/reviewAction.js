import { redirect } from "react-router-dom"

export const reviewAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        reviewMsg: data.get("reviewMsg"),
        rate: data.get("rate") !== null ? parseInt(data.get("rate")) : 0,
    }

    console.log(submission)

    return null
}