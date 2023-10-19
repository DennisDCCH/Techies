import axios from "../api/axios"

export const filterAction = async ({ request }) => {
    const data = await request.formData()

    const filterCriteria = {
        sport: data.get("sport"),
        proficiency: data.get("prof"),
        price: data.get("price"),
    }



    try {
        const response = await axios.post('/coaching_services/filter', filterCriteria);

        if (response.status === 200) {
            console.log('Filter successful');
            console.log (response.data);
            
        } else {
            console.log(filterCriteria);
            return { error: "Filter failed" };
        }
    } catch (error) {

        console.log(error.response.data.message)
        const errorMessage = error.response.data.message
        return { error: errorMessage };
    };
}