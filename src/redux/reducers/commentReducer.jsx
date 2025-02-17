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
  } from '../actions/types';

const initialState = {
    comments: [],
    loading: false,
    error: null,
  };
  
  export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case COMMENT_CREATE_REQUEST:
      case COMMENT_GET_ALL_REQUEST:
      case COMMENT_DELETE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case COMMENT_CREATE_SUCCESS:
        return { ...state, loading: false, comments: [...state.comments, action.payload], error: null };
  
      case COMMENT_GET_ALL_SUCCESS:
        return { ...state, loading: false, comments: action.payload, error: null };
  
      case COMMENT_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.filter((comment) => comment.id !== action.payload),
          error: null,
        };
  
      case COMMENT_CREATE_FAILURE:
      case COMMENT_GET_ALL_FAILURE:
      case COMMENT_DELETE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
