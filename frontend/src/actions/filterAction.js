import axios from "../api/axios"

export const filterAction = async ({ request }) => {
    const data = await request.formData()
    const filterCriteria = {};

    const sport = data.get("sport");
    const prof = data.get("prof");
    const price = data.get("price");

    if (sport !== "") {
        filterCriteria.sport = sport;
    }

    if (prof !== "") {
        filterCriteria.proficiency = prof;
    }

    if (price !== "") {
        filterCriteria.price = parseFloat(price);
    }

    try {
        const response = await axios.post('/coaching_services/filter', filterCriteria);
        console.log(response.data)
        return response.data
    } catch (error) {
        const errorMessage = error.response.data.message
        return { error: errorMessage };
    };
}