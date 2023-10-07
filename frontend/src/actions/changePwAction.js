import { redirect } from "react-router-dom"

export const changePwAction = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        oldpw: data.get("oldpw"),
        newpw: data.get("newpw"),
        newpw2: data.get("newpw2")
    }

    //password checker function can be done here or call another function

    if(submission.newpw != submission.newpw2){
        return {error: "ERROR: Password is not the same"}
    }

    console.log(submission)

    return redirect("/profile")
}