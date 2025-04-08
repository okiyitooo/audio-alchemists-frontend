import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from '../utils/authutils';

export const followService = {
    followUser: async (userIdToFollow) => {
        try {
            await axios.post(`${API_BASE_URL}/users/follow/${userIdToFollow}`, null, { // Body is null for POST
                headers: getAuthHeader(),
            });
        } catch (error) {
            console.error("API Error followUser:", error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to follow user');
        }
    },

    unfollowUser: async (userIdToUnfollow) => {
        try {
            await axios.delete(`${API_BASE_URL}/users/follow/${userIdToUnfollow}`, {
                headers: getAuthHeader(),
            });
        } catch (error) {
            console.error("API Error unfollowUser:", error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to unfollow user');
        }
    },

    getFollowing: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/follow/${userId}/following`, { headers: getAuthHeader() });
            return response.data; // Set<Long>
        } catch (error) {
            console.error("API Error getFollowing:", error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to get following list');
        }
    },
    getFollowers: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/follow/${userId}/followers`, { headers: getAuthHeader() });
            return response.data; // Set<Long>
        } catch (error) {
            console.error("API Error getFollowers:", error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to get followers list');
        }
    },
    checkFollowing: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/follow/${userId}/check`, { headers: getAuthHeader() });
            return response.data; // Boolean
        } catch (error) {
            console.error("API Error checkFollowing:", error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to check following status');
        }
    },
};