import { redirect } from "react-router-dom"
import axios from "../api/axios"

const CREATE_SERVICE_URL = '/coaching_services'
export const createListingAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        price: data.get("price"),
        location: data.get("location"),
        datetime: data.get("datetime"),
        sport: data.get("sport"),
        proficiency: data.get("proficiency"),
        description: data.get("description"),
        coverImg: data.get("file"),
        maximum: parseInt(data.get("slots"))
    }

    //submit new listing to backend
    console.log(submission)
    try {
        const response = await axios.post(CREATE_SERVICE_URL, submission);

        if(response.status === 200) {
            return redirect("/marketplace")
        } else {
            // Handle any problems
            return { error: "Creation of service failed"}
        }
    } catch (error) {
        console.log(error.response.data.message)
        const errorMessage = error.response.data.message
        return { error: errorMessage}
    }
}