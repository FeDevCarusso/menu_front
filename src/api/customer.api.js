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

export async function add_to_order(cant, code) {
  try {
    const response = await axios.post(
      `${api_url}/customerRoute/add_order/`,
      {
        cant,
        code,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return error.response;
  }
}

export async function get_order(restaurantCode) {
  try {
    const response = await axios.get(
      `${api_url}/customerRoute/view_order/${restaurantCode}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}
