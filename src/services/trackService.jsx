import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from '../utils/authutils';

export const trackService = {
    createTrack: async (projectId, trackData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/tracks`, trackData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create track');
        }
    },
    getAllTracks: async (projectId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/tracks`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get tracks');
        }
    },
    getTrack: async (projectId, trackId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/tracks/${trackId}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get track');
        }
    },
    updateTrack: async (projectId, trackId, trackData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/tracks/${trackId}`, trackData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update track');
        }
    },
    deleteTrack: async (projectId, trackId) => {
        try {
            await axios.delete(`${API_BASE_URL}/projects/${projectId}/tracks/${trackId}`, {
                headers: getAuthHeader()
            });
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete track');
        }
    },
};