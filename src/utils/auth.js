import axios from "axios";

export const getUser = async (token) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_KEY}/auth/me`, {
      headers: {
        Authorization: token,
      },
    });
    return { data: res.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log(error.response.data.error);
      return { error: error.response.data.error };
    }
    return { error: "An error occurred" };
  }
};

export const registerUser = async (credentials) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_KEY}/auth/signup`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: res.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log(error.response.data);
      return { error: error.response.data.error };
    }
    return { error: "An error occurred" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_KEY}/auth/signin`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: res.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log(error.response.data.error);
      return { error: error.response.data.error };
    }
    return { error: "An error occurred" };
  }
};
