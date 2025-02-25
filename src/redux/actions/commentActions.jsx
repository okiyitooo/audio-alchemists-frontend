import {
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_CREATE_FAILURE,
    COMMENT_GET_ALL_REQUEST,
    COMMENT_GET_ALL_SUCCESS,
    COMMENT_GET_ALL_FAILURE,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAILURE,
  } from './types';
  import commentService from '../../services/commentService';
  
  // Action Creators
  const createCommentRequest = () => ({ type: COMMENT_CREATE_REQUEST });
  const createCommentSuccess = (comment) => ({ type: COMMENT_CREATE_SUCCESS, payload: comment });
  const createCommentFailure = (error) => ({ type: COMMENT_CREATE_FAILURE, payload: error });
  
  const getAllCommentsRequest = () => ({ type: COMMENT_GET_ALL_REQUEST });
  const getAllCommentsSuccess = (comments) => ({ type: COMMENT_GET_ALL_SUCCESS, payload: comments });
  const getAllCommentsFailure = (error) => ({ type: COMMENT_GET_ALL_FAILURE, payload: error });
  
  const deleteCommentRequest = () => ({ type: COMMENT_DELETE_REQUEST });
  const deleteCommentSuccess = () => ({ type: COMMENT_DELETE_SUCCESS });
  const deleteCommentFailure = () => ({ type: COMMENT_DELETE_FAILURE });
  
  // Async Action Creators
  export const createComment = (projectId, commentData) => async (dispatch) => {
    dispatch(createCommentRequest());
    try {
      const comment = await commentService.createComment(projectId, commentData);
      dispatch(createCommentSuccess(comment));
      return true;
    } catch (error) {
      dispatch(createCommentFailure(error.message));
      return false;
    }
  };
  
  export const getAllComments = (projectId) => async (dispatch) => {
    dispatch(getAllCommentsRequest());
    try {
      const comments = await commentService.getAllComments(projectId);
      dispatch(getAllCommentsSuccess(comments));
      return true;
    } catch (error) {
      dispatch(getAllCommentsFailure(error.message));
      return false;
    }
  };
  
  export const deleteComment = (projectId, commentId) => async (dispatch) => {
    dispatch(deleteCommentRequest());
    try {
      await commentService.deleteComment(projectId, commentId);
      dispatch(deleteCommentSuccess());
      return true;
    } catch (error) {
      dispatch(deleteCommentFailure(error.message));
      return false;
    }
  };