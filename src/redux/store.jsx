import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { projectReducer } from './reducers/projectReducer';
import { trackReducer } from './reducers/trackReducer';
import { commentReducer } from './reducers/commentReducer';

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  track: trackReducer,
  comment: commentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;