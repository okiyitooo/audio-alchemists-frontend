import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from '../utils/authutils';

export const projectService = {
    createProject: async (projectData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/projects`, projectData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create project');
        }
    },
    getAllProjects: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/projects`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get projects');
        }
    },
    updateProject: async (projectId, projectData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/projects/${projectId}`, projectData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update project');
        }
    },
    deleteProject: async (projectId) => {
        try {
            await axios.delete(`${API_BASE_URL}/projects/${projectId}`, {
                headers: getAuthHeader()
            });
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete project');
        }
    },
    getProject: async (projectId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get project');
        }
    },

};