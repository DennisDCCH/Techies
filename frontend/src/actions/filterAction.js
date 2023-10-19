import axios from "../api/axios"
import { useActionData } from "react-router-dom"


export const filterAction = async ({ request }) => {
    const data = useActionData()

    const filterCriteria = {
        sport: data.get("sport"),
        proficiency: data.get("prof"),
        price: data.get("price"),
    }

    console.log(filterCriteria);

    try {
        const response = await axios.post('/coaching_services/filter', filterCriteria);

        if (response.status === 200) {
            console.log('Filter successful');
            
        } else {
            return { error: "Filter failed" };
        }
    } catch (error) {
        console.log(error)
        const errorMessage = error.response.data.message
        return { error: errorMessage };
    };
}