import {
    GET_PROJECT_RECS_REQUEST, GET_PROJECT_RECS_SUCCESS, GET_PROJECT_RECS_FAILURE,
    GET_USER_RECS_REQUEST, GET_USER_RECS_SUCCESS, GET_USER_RECS_FAILURE
} from './types';
import { recommendationService } from '../../services/recommendationService'; // Create this service

// Project Recs
const getProjectRecsRequest = () => ({ type: GET_PROJECT_RECS_REQUEST });
const getProjectRecsSuccess = (data) => ({ type: GET_PROJECT_RECS_SUCCESS, payload: data });
const getProjectRecsFailure = (error) => ({ type: GET_PROJECT_RECS_FAILURE, payload: error });

// User Reqs
const getUserRecsRequest = () => ({ type: GET_USER_RECS_REQUEST });
const getUserRecsSuccess = (data) => ({ type: GET_USER_RECS_SUCCESS, payload: data });
const getUserRecsFailure = (error) => ({ type: GET_USER_RECS_FAILURE, payload: error });


export const fetchProjectRecommendations = (limit = 5) => async (dispatch) => {
    dispatch(getProjectRecsRequest());
    try {
        const data = await recommendationService.getProjectRecommendations(limit);
        dispatch(getProjectRecsSuccess(data));
    } catch (error) {
        dispatch(getProjectRecsFailure(error.message || 'Failed to fetch project recommendations'));
    }
};

export const fetchUserRecommendations = (limit = 5) => async (dispatch) => {
    dispatch(getUserRecsRequest());
    try {
        const data = await recommendationService.getUserRecommendations(limit);
        dispatch(getUserRecsSuccess(data));
    } catch (error) {
        dispatch(getUserRecsFailure(error.message || 'Failed to fetch user recommendations'));
    }
};