import { 
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  user: null, // Will hold { id, username, email, role, following: [], followers: [] } eventually
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: { ...action.payload, following: [], followers: []}, error: null };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, user: null, error: action.payload };
    case USER_LOGOUT:
      localStorage.removeItem('token');
      return initialState; // Reset state on logout
    case FOLLOW_USER_SUCCESS:
      if (state.user && !state.user.following?.includes(action.payload))
        return {
          ...state,
          user: {
            ...state.user,
            following: [...state.user.following, action.payload], // Assuming payload is the followed user object
          },
        };
    case UNFOLLOW_USER_SUCCESS:
      if (state.user && state.user.following?.includes(action.payload))
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter((id) => id !== action.payload), // Assuming payload is the unfollowed user object
          },
        };
    default:
      return state;
  }
};