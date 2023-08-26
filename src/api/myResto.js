import axios from "axios"

const api_url = process.env.REACT_APP_API_URL

export async function getRestaurantInfo() {
    try {
        const response = await axios.get(`${api_url}/user/restaurant_info`, { withCredentials: true })
        return response
    } catch (error) {
        return error.response
    }
}
export async function add_category(cat) {
    try {
        const response = await axios.post(`${api_url}/user/create_category`, { name: cat }, { withCredentials: true })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export async function get_cats() {
    try {
        const response = await
            axios.get(`${api_url}/user/all_cats`,
                { withCredentials: true })
        return response.data
    } catch (error) {
        return error.response.data

    }
}

export async function add_food(
    food,selectedImage
) {
    console.log(selectedImage)
    try {
        const response = await axios.post(`${api_url}/user/add_food`, {
            ...food,
            image: selectedImage
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}