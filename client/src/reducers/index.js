import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  notification: snackbarReducer,
});
