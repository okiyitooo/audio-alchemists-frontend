import { API_BASE_URL, api } from "../utils/authutils";

const userService = {
    login: async (loginDto) => {
        try {
            const response = await api.post(`${API_BASE_URL}/auth/login`, { usernameOrEmail: loginDto.username, password: loginDto.password });
            const { username } = loginDto;
            localStorage.setItem('token', response.data.accessToken);
            console.log("Login successful:", response.data);
            console.log("Username:", username);
            return username;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to login');
        }
    },
    register: async (user) => {
        try {
            await api.post(`${API_BASE_URL}/auth/register`, user);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to Signup');
        }
    },
};

export default userService;