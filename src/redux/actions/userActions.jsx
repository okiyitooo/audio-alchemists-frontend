import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from './types';
import userService from '../../services/userService';

export const loginRequest = () => ({ type: USER_LOGIN_REQUEST });
export const loginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});
export const loginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const logoutUser = () => ({ type: USER_LOGOUT });

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await userService.login(username, password);
    dispatch(loginSuccess(user));
    return true; // indicate success
  } catch (error) {
    dispatch(loginFailure(error.message));
    return false; 
  }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
}
