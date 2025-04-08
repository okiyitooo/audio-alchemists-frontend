import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { userReducer } from './reducers/userReducer';
import { projectReducer } from './reducers/projectReducer';
import { trackReducer } from './reducers/trackReducer';
import { commentReducer } from './reducers/commentReducer';
import { recommendationReducer } from './reducers/recommendationReducer';
import { followReducer } from './reducers/followReducer'; 

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  track: trackReducer,
  comment: commentReducer,
  recommendation: recommendationReducer,
  follow: followReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;