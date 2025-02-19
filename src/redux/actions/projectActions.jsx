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
