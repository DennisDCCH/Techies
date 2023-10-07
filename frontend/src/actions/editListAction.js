import { redirect } from "react-router-dom"

export const editListAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        price: data.get("price"),
        location: data.get("location"),
        datetime: data.get("datetime"),
        sport: data.get("sport"),
        proficiency: data.get("proficiency"),
        description: data.get("description"),
        coverImg: data.get("file")
    }

    console.log(submission)

    return redirect("/mylisting")
}