import axios from "axios";

// Used in the following components: App.jsx, SignIn.jsx and SignUp.jsx

// Get request to /auth/me to get user data from token in local storage (if it exists)
export const getUser = async (token) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_KEY}/auth/me`, {
      headers: {
        Authorization: token,
      },
    });
    return { data: res.data };
  } catch (error) {
    // If there is an error, return the error message
    if (error.response.data.error) {
      console.log(error.response.data.error);
      return { error: error.response.data.error };
    }
    // If there is no error message, return a generic error
    return { error: "An error occurred" };
  }
};
// ----------------------------------------------------------------------------

// Post request to /auth/signup to register a new user with the provided credentials and return a token if successful (stored in local storage)
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
    if (error.response.data.error) {
      console.log(error.response.data);
      return { error: error.response.data.error };
    }
    return { error: "An error occurred" };
  }
};

// ----------------------------------------------------------------------------

// Post request to /auth/signin to login a user with the provided credentials and return a token if successful (stored in local storage)
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
    if (error.response.data.error) {
      console.log(error.response.data.error);
      return { error: error.response.data.error };
    }
    return { error: "An error occurred" };
  }
};
