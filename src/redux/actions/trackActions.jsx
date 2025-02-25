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
  } from './types';
  import { trackService } from '../../services/trackService';
  
  // Action Creators
  const createTrackRequest = () => ({ type: TRACK_CREATE_REQUEST });
  const createTrackSuccess = (track) => ({ type: TRACK_CREATE_SUCCESS, payload: track });
  const createTrackFailure = (error) => ({ type: TRACK_CREATE_FAILURE, payload: error });
  
  const getAllTracksRequest = () => ({ type: TRACK_GET_ALL_REQUEST });
  const getAllTracksSuccess = (tracks) => ({ type: TRACK_GET_ALL_SUCCESS, payload: tracks });
  const getAllTracksFailure = (error) => ({ type: TRACK_GET_ALL_FAILURE, payload: error });
  
  const getTrackRequest = () => ({ type: TRACK_GET_REQUEST });
  const getTrackSuccess = (track) => ({ type: TRACK_GET_SUCCESS, payload: track });
  const getTrackFailure = (error) => ({ type: TRACK_GET_FAILURE, payload: error });
  
  const updateTrackRequest = () => ({ type: TRACK_UPDATE_REQUEST });
  const updateTrackSuccess = (track) => ({ type: TRACK_UPDATE_SUCCESS, payload: track });
  const updateTrackFailure = (error) => ({ type: TRACK_UPDATE_FAILURE, payload: error });
  
  const deleteTrackRequest = () => ({ type: TRACK_DELETE_REQUEST });
  const deleteTrackSuccess = () => ({ type: TRACK_DELETE_SUCCESS });
  const deleteTrackFailure = () => ({ type: TRACK_DELETE_FAILURE });
  
  // Async Action Creators
  export const createTrack = (projectId, trackData) => async (dispatch) => {
    dispatch(createTrackRequest());
    try {
      const track = await trackService.createTrack(projectId, trackData);
      dispatch(createTrackSuccess(track));
      return true;
    } catch (error) {
      dispatch(createTrackFailure(error.message));
      return false;
    }
  };
  
  export const getAllTracks = (projectId) => async (dispatch) => {
    dispatch(getAllTracksRequest());
    try {
      const tracks = await trackService.getAllTracks(projectId);
      dispatch(getAllTracksSuccess(tracks));
      return true;
    } catch (error) {
      dispatch(getAllTracksFailure(error.message));
      return false;
    }
  };
  
  export const getTrack = (projectId, trackId) => async (dispatch) => {
    dispatch(getTrackRequest());
    try {
      const track = await trackService.getTrack(projectId, trackId);
      dispatch(getTrackSuccess(track));
      return true;
    } catch (error) {
      dispatch(getTrackFailure(error.message));
      return false;
    }
  };
  
  export const updateTrack = (projectId, trackId, trackData) => async (dispatch) => {
    dispatch(updateTrackRequest());
    try {
      const track = await trackService.updateTrack(projectId, trackId, trackData);
      dispatch(updateTrackSuccess(track));
      return true;
    } catch (error) {
      dispatch(updateTrackFailure(error.message));
      return false;
    }
  };
  
  export const deleteTrack = (projectId, trackId) => async (dispatch) => {
    dispatch(deleteTrackRequest());
    try {
      await trackService.deleteTrack(projectId, trackId);
      dispatch(deleteTrackSuccess());
      return true;
    } catch (error) {
      dispatch(deleteTrackFailure(error.message));
      return false;
    }
  };