import {
    // Follow actions
    FOLLOW_USER_REQUEST, 
    FOLLOW_USER_SUCCESS, 
    FOLLOW_USER_FAILURE,
    
    // Unfollow actions
    UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE,
    
    UPDATE_USER_FOLLOWING 
} from './types';
import { followService } from '../../services/followService';

// Follow
const followUserRequest = (userId) => ({ type: FOLLOW_USER_REQUEST, payload: userId });
const followUserSuccess = (userId) => ({ type: FOLLOW_USER_SUCCESS, payload: userId });
const followUserFailure = (userId, error) => ({ type: FOLLOW_USER_FAILURE, payload: { userId, error } });

// Unfollow
const unfollowUserRequest = (userId) => ({ type: UNFOLLOW_USER_REQUEST, payload: userId });
const unfollowUserSuccess = (userId) => ({ type: UNFOLLOW_USER_SUCCESS, payload: userId });
const unfollowUserFailure = (userId, error) => ({ type: UNFOLLOW_USER_FAILURE, payload: { userId, error } });


export const followUser = (userIdToFollow) => async (dispatch) => {
    dispatch(followUserRequest(userIdToFollow));
    try {
        await followService.followUser(userIdToFollow);
        dispatch(followUserSuccess(userIdToFollow));
        dispatch({
            type: UPDATE_USER_FOLLOWING,
            payload: userIdToFollow
        });
    } catch (error) {
        dispatch(followUserFailure(userIdToFollow, error.message || 'Follow failed'));
    }
};

export const unfollowUser = (userIdToUnfollow) => async (dispatch) => {
    dispatch(unfollowUserRequest(userIdToUnfollow));
    try {
        await followService.unfollowUser(userIdToUnfollow);
        dispatch(unfollowUserSuccess(userIdToUnfollow));
        dispatch({
            type: UPDATE_USER_FOLLOWING,
            payload: userIdToUnfollow
        });
    } catch (error) {
        dispatch(unfollowUserFailure(userIdToUnfollow, error.message || 'Unfollow failed'));
    }
};