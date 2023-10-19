import { redirect } from "react-router-dom"
import axios from "../api/axios"

export const editListAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        price: parseFloat(data.get("price")),
        location: data.get("location"),
        datetime: data.get("datetime"),
        sport: data.get("sport"),
        proficiency: data.get("proficiency"),
        description: data.get("description"),
        coverImg: data.get("file"),
    }

    console.log(submission)
    try {
        const response = await axios.put(`/services/${data.get("id")}`, submission)
        if(response.status === 200) {
            return redirect("/mylisting")
        }
    } catch (error) {
        console.log(error)
        return null
    }
}