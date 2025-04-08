import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from '../utils/authutils';

export const recommendationService = {
    getProjectRecommendations: async (limit = 5) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/recommendations/projects?limit=${limit}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            console.error("API Error getProjectRecommendations:", error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to fetch project recommendations');
        }
    },

    getUserRecommendations: async (limit = 5) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/recommendations/users?limit=${limit}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            console.error("API Error getUserRecommendations:", error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to fetch user recommendations');
        }
    },
};