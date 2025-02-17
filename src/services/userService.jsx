import axios from "axios";
import { API_BASE_URL } from "../utils/authutils";

const userService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { usernameOrEmail: username, password });
            localStorage.setItem('token', response.data.accessToken);
            return {username};
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to login');
        }
    },
    register: async (username, email, password) => {
        try {
            await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password, role: 'USER' });
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to Signup');
        }
    },
};

export default userService;