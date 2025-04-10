import {
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_FAILURE,
    PROJECT_GET_ALL_REQUEST,
    PROJECT_GET_ALL_SUCCESS,
    PROJECT_GET_ALL_FAILURE,
    PROJECT_UPDATE_REQUEST,
    PROJECT_UPDATE_SUCCESS,
    PROJECT_UPDATE_FAILURE,
    PROJECT_DELETE_REQUEST,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAILURE,
    PROJECT_GET_REQUEST,
    PROJECT_GET_SUCCESS,
    PROJECT_GET_FAILURE,
    GET_PROJECT_VERSIONS_REQUEST,
    GET_PROJECT_VERSIONS_SUCCESS,
    GET_PROJECT_VERSIONS_FAILURE,
    REVERT_PROJECT_REQUEST,
    REVERT_PROJECT_SUCCESS,
    REVERT_PROJECT_FAILURE,
    SEARCH_PROJECTS_REQUEST,
    SEARCH_PROJECTS_SUCCESS,
    SEARCH_PROJECTS_FAILURE,
    CLEAR_SEARCH_RESULTS,
    SAVE_PROJECT_VERSION_REQUEST,
    SAVE_PROJECT_VERSION_SUCCESS,
    SAVE_PROJECT_VERSION_FAILURE,
} from './types';
import { projectService } from '../../services/projectService'; // Assuming you have a projectService

const createProjectRequest = () => ({ type: PROJECT_CREATE_REQUEST });
const createProjectSuccess = (project) => ({ type: PROJECT_CREATE_SUCCESS, payload: project });
const createProjectFailure = (error) => ({ type: PROJECT_CREATE_FAILURE, payload: error });

const getProjectRequest = () => ({ type: PROJECT_GET_REQUEST });
const getProjectSuccess = (project) => ({ type: PROJECT_GET_SUCCESS, payload: project });
const getProjectFailure = (error) => ({ type: PROJECT_GET_FAILURE, payload: error });

const getAllProjectsRequest = () => ({ type: PROJECT_GET_ALL_REQUEST });
const getAllProjectsSuccess = (projects) => ({ type: PROJECT_GET_ALL_SUCCESS, payload: projects });
const getAllProjectsFailure = (error) => ({ type: PROJECT_GET_ALL_FAILURE, payload: error });

const updateProjectRequest = () => ({ type: PROJECT_UPDATE_REQUEST });
const updateProjectSuccess = (project) => ({ type: PROJECT_UPDATE_SUCCESS, payload: project });
const updateProjectFailure = (error) => ({ type: PROJECT_UPDATE_FAILURE, payload: error });

const deleteProjectRequest = () => ({ type: PROJECT_DELETE_REQUEST });
const deleteProjectSuccess = (projectId) => ({ type: PROJECT_DELETE_SUCCESS, payload: projectId });
const deleteProjectFailure = (error) => ({ type: PROJECT_DELETE_FAILURE, payload: error });

// --- Version Control Action Creators ---

const getProjectVersionsRequest = () => ({ type: GET_PROJECT_VERSIONS_REQUEST });
const getProjectVersionsSuccess = (versions) => ({ type: GET_PROJECT_VERSIONS_SUCCESS, payload: versions });
const getProjectVersionsFailure = (error) => ({ type: GET_PROJECT_VERSIONS_FAILURE, payload: error });

const revertProjectRequest = () => ({ type: REVERT_PROJECT_REQUEST });
const revertProjectSuccess = (project) => ({ type: REVERT_PROJECT_SUCCESS, payload: project });
const revertProjectFailure = (error) => ({ type: REVERT_PROJECT_FAILURE, payload: error });

// --- Search Action Creators ---
const searchProjectsRequest = () => ({ type: SEARCH_PROJECTS_REQUEST });
const searchProjectsSuccess = (results) => ({ type: SEARCH_PROJECTS_SUCCESS, payload: results });
const searchProjectsFailure = (error) => ({ type: SEARCH_PROJECTS_FAILURE, payload: error });
export const clearSearchResults = () => ({ type: CLEAR_SEARCH_RESULTS }); 

// --- Save Project Version Action Creators ---

const saveProjectVersionRequest = () => ({ type: SAVE_PROJECT_VERSION_REQUEST });
const saveProjectVersionSuccess = (newVersion) => ({ type: SAVE_PROJECT_VERSION_SUCCESS, payload: newVersion }); // Optional: Payload could be the new version info
const saveProjectVersionFailure = (error) => ({ type: SAVE_PROJECT_VERSION_FAILURE, payload: error });

export const saveNewVersion = (projectId, description) => async (dispatch, getState) => {
    dispatch(saveProjectVersionRequest());
    try {
        // Call the API service method
        await projectService.saveNewVersion(projectId, description); // API call returns void or maybe the new version DTO
        dispatch(saveProjectVersionSuccess()); // Indicate success
        alert('Version saved successfully!'); // Simple user feedback

        // --- Option 1: Re-fetch the entire version list ---
        // This is simpler but might fetch more data than needed
        // const versions = await projectService.getProjectVersions(projectId);
        // dispatch({ type: GET_PROJECT_VERSIONS_SUCCESS, payload: versions });

        // --- Option 2: (If backend returns the new version) Update list incrementally ---
        // const newVersionDto = await projectService.saveNewVersion(projectId, description);
        // dispatch(saveProjectVersionSuccess(newVersionDto)); // Pass new version to reducer
        // The reducer would then prepend this new version to the existing list (see reducer update)

        // --- Option 3: Let VersionHistoryList re-fetch on its own ---
        // If VersionHistoryList re-fetches when the save success happens (e.g., via a notification or state change),
        // might not need to explicitly update the list here.

        return true; // Indicate success for potential component logic
    } catch (error) {
        dispatch(saveProjectVersionFailure(error.message || 'Failed to save version'));
        alert(`Failed to save version: ${error.message || 'Unknown error'}`); // Simple feedback
        return false; // Indicate failure
    }
};

// --- Async Actions ---
export const searchProjects = (query) => async (dispatch) => {
    if (!query || query.trim() === "") {
        dispatch(clearSearchResults()); // Clear results if query is empty
        return;
    }
    dispatch(searchProjectsRequest());
    try {
        const results = await projectService.searchProjects(query);
        dispatch(searchProjectsSuccess(results));
    } catch (error) {
        dispatch(searchProjectsFailure(error.message || "Search failed"));
    }
};

export const createProject = (projectData) => async (dispatch) => {
    dispatch(createProjectRequest());
    try {
        const project = await projectService.createProject(projectData);
        dispatch(createProjectSuccess(project));
    } catch (error) {
        dispatch(createProjectFailure(error.message));
    }
};

export const getProject = (projectId) => async (dispatch) => {
    dispatch(getProjectRequest());
    try {
        const project = await projectService.getProject(projectId);
        dispatch(getProjectSuccess(project));
    } catch (error) {
        dispatch(getProjectFailure(error.message));
    }
};

export const getAllProjects = () => async (dispatch) => {
    dispatch(getAllProjectsRequest());
    try {
        const projects = await projectService.getAllProjects();
        dispatch(getAllProjectsSuccess(projects));
    } catch (error) {
        dispatch(getAllProjectsFailure(error.message));
    }
};

export const updateProject = (projectId, projectData) => async (dispatch) => {
    dispatch(updateProjectRequest());
    try {
        const project = await projectService.updateProject(projectId, projectData);
        dispatch(updateProjectSuccess(project));
    } catch (error) {
        dispatch(updateProjectFailure(error.message));
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    dispatch(deleteProjectRequest());
    try {
        await projectService.deleteProject(projectId);
        dispatch(deleteProjectSuccess(projectId));
    } catch (error) {
        dispatch(deleteProjectFailure(error.message));
    }
};

// --- Version Control Async Actions ---

export const getProjectVersions = (projectId) => async (dispatch) => {
    dispatch(getProjectVersionsRequest());
    try {
        const versions = await projectService.getProjectVersions(projectId);
        dispatch(getProjectVersionsSuccess(versions));
    } catch (error) {
        dispatch(getProjectVersionsFailure(error.message));
    }
};

export const revertToVersion = (projectId, versionId) => async (dispatch) => {
    dispatch(revertProjectRequest());
    try {
      const revertedProject = await projectService.revertToVersion(projectId, versionId);
      dispatch(revertProjectSuccess(revertedProject));
      dispatch({ type: PROJECT_GET_SUCCESS, payload: revertedProject });
      alert('Project successfully reverted!'); // Simple feedback
      return true;
    } catch (error) {
      dispatch(revertProjectFailure(error.message || 'Failed to revert project'));
      alert(`Revert failed: ${error.message || 'Unknown error'}`); // Simple feedback
      return false;
    }
  };