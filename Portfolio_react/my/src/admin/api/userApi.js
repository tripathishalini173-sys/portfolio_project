import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/login"; 
// change to your backend login route

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });

    return response.data;  // return token/user data
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
