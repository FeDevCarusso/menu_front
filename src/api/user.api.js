import axios from "axios";

const api_url = process.env.REACT_APP_API_URL;

export async function is_auth() {
  try {
    const response = await axios.get(`${api_url}/auth/is_login`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function login(username, password) {
  try {
    const response = await axios.post(
      `${api_url}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function logout() {
  try {
    const response = await axios.get(`${api_url}/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.data;
  }
}
