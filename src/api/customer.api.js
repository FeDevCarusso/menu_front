import axios from "axios";

const api_url = process.env.REACT_APP_API_URL;

export async function get_resto_data(code) {
  try {
    const response = await axios.get(
      `${api_url}/customerRoute/restaurant/${code}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}
