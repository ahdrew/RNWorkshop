import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';

export default combineReducers(Object.assign(appReducer,userReducer));