import axios from "axios";

const { REACT_APP_API_URL } = process.env

export async function login(username, password) {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
            username,
            password
        }, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export async function is_login() {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/auth/is_login`, { withCredentials: true })
        return response
    } catch (error) {
        return error.response
    }
}

export async function logout() {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/auth/logout`, { withCredentials: true })
        return response
    } catch (error) {
        return error.response
    }
}

export async function getRestaurant(restaurant) {
    try {
        const result = await axios.get(`${REACT_APP_API_URL}/restaurant?restaurant=${restaurant}`)
        return result?.data
    } catch (error) {
        return error.response
    }
}

export async function find_restaurants(query) {
    try {
        const result = await axios.get(`${REACT_APP_API_URL}/?restaurant=${query}`)
        return result?.data
    } catch (error) {
        return error.response
    }
}