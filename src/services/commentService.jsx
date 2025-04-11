import { api, getAuthHeader, API_BASE_URL } from '../utils/authutils';

const commentService = {
  createComment: async (projectId, commentData) => {
    try {
      const response = await api.post(`${API_BASE_URL}/projects/${projectId}/comments`, commentData, {
        headers: { Authorization: getAuthHeader() },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create comment';
    }
  },

  getAllComments: async (projectId) => {
    try {
      const response = await api.get(`${API_BASE_URL}/projects/${projectId}/comments`, {
        headers: { Authorization: getAuthHeader() },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get comments';
    }
  },

  deleteComment: async (projectId, commentId) => {
    try {
      const response = await api.delete(`${API_BASE_URL}/projects/${projectId}/comments/${commentId}`, {
        headers: { Authorization: getAuthHeader() },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete comment';
    }
  },
};

export default commentService;