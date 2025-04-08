import {
    TRACK_CREATE_REQUEST,
    TRACK_CREATE_SUCCESS,
    TRACK_CREATE_FAILURE,
    TRACK_GET_ALL_REQUEST,
    TRACK_GET_ALL_SUCCESS,
    TRACK_GET_ALL_FAILURE,
    TRACK_GET_REQUEST,
    TRACK_GET_SUCCESS,
    TRACK_GET_FAILURE,
    TRACK_UPDATE_REQUEST,
    TRACK_UPDATE_SUCCESS,
    TRACK_UPDATE_FAILURE,
    TRACK_DELETE_REQUEST,
    TRACK_DELETE_SUCCESS,
    TRACK_DELETE_FAILURE,
    TRACK_UPDATE_MUSIC_DATA,
  } from '../actions/types';

const initialState = {
    tracks: [],
    loading: false,
    error: null,
    track: null,
  };
  
  export const trackReducer = (state = initialState, action) => {
    switch (action.type) {
      case TRACK_CREATE_REQUEST:
      case TRACK_GET_ALL_REQUEST:
      case TRACK_GET_REQUEST:
      case TRACK_UPDATE_REQUEST:
      case TRACK_DELETE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case TRACK_CREATE_SUCCESS:
        return { ...state, loading: false, tracks: [...state.tracks, action.payload], error: null };
      case TRACK_GET_ALL_SUCCESS:
        return { ...state, loading: false, tracks: action.payload, error: null };
      case TRACK_GET_SUCCESS:
        return { ...state, loading: false, track: action.payload, error: null };
      case TRACK_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          tracks: state.tracks.map((track) =>
            track.id === action.payload.id ? action.payload : track
          ),
          error: null,
        };
  
      case TRACK_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          tracks: state.tracks.filter((track) => track.id !== action.payload),
          error: null,
        };
      case TRACK_CREATE_FAILURE:
      case TRACK_GET_ALL_FAILURE:
      case TRACK_GET_FAILURE:
      case TRACK_UPDATE_FAILURE:
      case TRACK_DELETE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case TRACK_UPDATE_MUSIC_DATA:
        return { ...state, musicData: action.payload };
      default:
        return state;
    }
  };