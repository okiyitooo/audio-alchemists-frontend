import {
    GET_PROJECT_RECS_REQUEST, GET_PROJECT_RECS_SUCCESS, GET_PROJECT_RECS_FAILURE,
    GET_USER_RECS_REQUEST, GET_USER_RECS_SUCCESS, GET_USER_RECS_FAILURE
} from '../actions/types';

const initialState = {
    projectRecs: [],
    projectRecsLoading: false,
    projectRecsError: null,
    userRecs: [],
    userRecsLoading: false,
    userRecsError: null,
};

export const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT_RECS_REQUEST:
            return { ...state, projectRecsLoading: true, projectRecsError: null };
        case GET_PROJECT_RECS_SUCCESS:
            return { ...state, projectRecsLoading: false, projectRecs: action.payload };
        case GET_PROJECT_RECS_FAILURE:
            return { ...state, projectRecsLoading: false, projectRecsError: action.payload };

        case GET_USER_RECS_REQUEST:
            return { ...state, userRecsLoading: true, userRecsError: null };
        case GET_USER_RECS_SUCCESS:
            return { ...state, userRecsLoading: false, userRecs: action.payload };
        case GET_USER_RECS_FAILURE:
            return { ...state, userRecsLoading: false, userRecsError: action.payload };

        default:
            return state;
    }
};