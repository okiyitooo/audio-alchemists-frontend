import {
    PROJECT_GET_REQUEST,
    PROJECT_GET_SUCCESS,
    PROJECT_GET_FAILURE,
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
    GET_PROJECT_VERSIONS_REQUEST,
    GET_PROJECT_VERSIONS_SUCCESS,
    GET_PROJECT_VERSIONS_FAILURE,
    REVERT_PROJECT_REQUEST,
    REVERT_PROJECT_SUCCESS,
    REVERT_PROJECT_FAILURE,
    SEARCH_PROJECTS_REQUEST,
    SEARCH_PROJECTS_SUCCESS,
    SEARCH_PROJECTS_FAILURE,
    CLEAR_SEARCH_RESULTS, // import clear action type
  } from '../actions/types';

const initialState = {
    loading: false,
    projects: [],
    project: null,
    versions: [],
    reverting: false,
    error: null,
    versionError: null,
    revertError: null,
    searchResults: [], // Add state for search results
    searchLoading: false, // Add separate loading state for search
    searchError: null, // Add separate error state for search
};

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_GET_REQUEST:
            return { ...state, loading: true, error: null, project: null };
        case PROJECT_GET_SUCCESS:
            return { ...state, loading: false, project: action.payload, error: null };
        case PROJECT_GET_FAILURE:
            return { ...state, loading: false, project: null, error: action.payload };
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
        case GET_PROJECT_VERSIONS_REQUEST:
            return { ...state, loading: true, versionError: null, versions: [] };
        case GET_PROJECT_VERSIONS_SUCCESS:
            return { ...state, loading: false, versions: action.payload, versionError: null };
        case GET_PROJECT_VERSIONS_FAILURE:
            return { ...state, loading: false, versionError: action.payload, versions: [] };
        case REVERT_PROJECT_REQUEST:
            return { ...state, reverting: true, revertError: null };
        case REVERT_PROJECT_SUCCESS:
            return { ...state, reverting: false, revertError: null };
        case REVERT_PROJECT_FAILURE:
            return { ...state, reverting: false, revertError: action.payload };

        // --- Search Cases ---
        case SEARCH_PROJECTS_REQUEST:
            return { ...state, searchLoading: true, searchError: null };
        case SEARCH_PROJECTS_SUCCESS:
            return { ...state, searchLoading: false, searchResults: action.payload, searchError: null };
        case SEARCH_PROJECTS_FAILURE:
            return { ...state, searchLoading: false, searchResults: [], searchError: action.payload };
        case CLEAR_SEARCH_RESULTS:
            return { ...state, searchResults: [], searchLoading: false, searchError: null }; // Clear results and reset states
        // --- End Search Cases ---
        default:
            return state;
    }
};

