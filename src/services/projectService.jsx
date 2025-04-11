import { api, API_BASE_URL, getAuthHeader } from '../utils/authutils';

export const projectService = {
    createProject: async (projectData) => {
        try {
            const response = await api.post(`${API_BASE_URL}/projects`, projectData)
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create project');
        }
    },
    getAllProjects: async () => {
        try {
            const response = await api.get(`${API_BASE_URL}/projects`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get projects');
        }
    },
    updateProject: async (projectId, projectData) => {
        try {
            const response = await api.put(`${API_BASE_URL}/projects/${projectId}`, projectData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update project');
        }
    },
    deleteProject: async (projectId) => {
        try {
            await api.delete(`${API_BASE_URL}/projects/${projectId}`, {
                headers: getAuthHeader()
            });
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete project');
        }
    },
    getProject: async (projectId) => {
        try {
            const response = await api.get(`${API_BASE_URL}/projects/${projectId}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get project');
        }
    },
    getProjectVersions: async (projectId) => {
      try {
        const response = await api.get(`${API_BASE_URL}/projects/${projectId}/versions`, {
          headers: getAuthHeader(),
        });
        return response.data; // Expecting List<ProjectVersionDto>
      } catch (error) {
        console.error("API Error getProjectVersions:", error.response || error);
        throw new Error(error.response?.data?.message || 'Failed to fetch project versions');
      }
    },
    saveNewVersion: async (projectId, description) => {
      try {
        // Backend endpoint expects POST /projects/{projectId}/versions
        // Send description in the request body
        const response = await api.post(`${API_BASE_URL}/projects/${projectId}/versions`,
          { description }, // Send description object as JSON body
        );
        // Backend returns 201 Created with no body, or potentially the new ProjectVersionDto
        return response.data; // Return data if backend sends it, otherwise this might be empty/null
      } catch (error) {
        console.error("API Error saveNewVersion:", error.response || error);
        throw new Error(error.response?.data?.message || 'Failed to save project version');
      }
    },
  
    revertToVersion: async (projectId, versionId) => {
      try {
        const response = await api.post(`${API_BASE_URL}/projects/${projectId}/revert/${versionId}`, null, { // POST request, body can be null if not needed
          headers: getAuthHeader(),
        });
        return response.data; // Expecting the reverted ProjectDto
      } catch (error) {
        console.error("API Error revertToVersion:", error.response || error);
        throw new Error(error.response?.data?.message || 'Failed to revert project');
      }
    },
    searchProjects: async (query) => {
      try {
        // Encode the query parameter to handle special characters
        const encodedQuery = encodeURIComponent(query);
        const response = await api.get(`${API_BASE_URL}/projects/search?query=${encodedQuery}`, {
          headers: getAuthHeader(),
        });
        return response.data; // Expecting List<ProjectDto>
      } catch (error) {
        console.error("API Error searchProjects:", error.response || error);
        throw new Error(error.response?.data?.message || 'Failed to search projects');
      }
    },
};