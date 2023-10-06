import { redirect } from "react-router-dom"

export const loginAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        username: data.get("username"),
        password: data.get("password")
    }

    console.log(submission)

    // send to backend submission to check username and password

    return redirect("/homepage")
}