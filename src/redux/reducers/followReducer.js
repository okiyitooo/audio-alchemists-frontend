import {
    FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE
} from '../actions/types';

const initialState = {
    followingInProgress: {}, // Track loading state per user ID: { userId: true/false }
    error: null,
};

export const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER_REQUEST:
        case UNFOLLOW_USER_REQUEST:
            return {
                ...state,
                followingInProgress: { ...state.followingInProgress, [action.payload]: true },
                error: null,
            };
        case FOLLOW_USER_SUCCESS:
        case UNFOLLOW_USER_SUCCESS:
            const { [action.payload]: removed, ...restFollowingInProgress } = state.followingInProgress;
            return {
                ...state,
                followingInProgress: restFollowingInProgress,
                error: null,
            };
        case FOLLOW_USER_FAILURE:
        case UNFOLLOW_USER_FAILURE:
            // Remove loading state, set error
             const { [action.payload.userId]: removedError, ...restErrorFollowingInProgress } = state.followingInProgress;
             return {
                ...state,
                followingInProgress: restErrorFollowingInProgress,
                error: action.payload.error, // Store the error message
             };
        default:
            return state;
    }
};