import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';
import loadingReducer from './loading';

export default combineReducers(Object.assign(appReducer,userReducer,loadingReducer));