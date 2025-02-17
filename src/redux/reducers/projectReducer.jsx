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
  } from '../actions/types';

const initialState = {
    loading: false,
    projects: [],
    error: null,
};

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_CREATE_REQUEST:
        case PROJECT_GET_ALL_REQUEST:
        case PROJECT_UPDATE_REQUEST:
        case PROJECT_DELETE_REQUEST:
            return { ...state, loading: true, error: null };
        case PROJECT_CREATE_SUCCESS:
            return { ...state, loading: false, projects: [...state.projects, action.payload], error: null };
        case PROJECT_GET_ALL_SUCCESS:
            return { ...state, loading: false, projects: action.payload, error: null };
        case PROJECT_UPDATE_SUCCESS:
            return { ...state, loading: false, projects: state.projects.map(project => project.id === action.payload.id ? action.payload : project), error: null };
        case PROJECT_DELETE_SUCCESS:
            return { ...state, loading: false, projects: state.projects.filter(project => project.id !== action.payload), error: null };
        case PROJECT_CREATE_FAILURE:
        case PROJECT_GET_ALL_FAILURE:
        case PROJECT_UPDATE_FAILURE:
        case PROJECT_DELETE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

