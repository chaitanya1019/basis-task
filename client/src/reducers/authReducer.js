import {
  USER_LOADED,
  OTP_GENERATE_FAIL,
  OTP_GENERATE_SUCCESS,
  OTP_VERIFY_FAIL,
  OTP_VERIFY_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_LOADING,
} from '../actions/types.js';

const initialState = {
  token: localStorage.getItem('basis-token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  userType: null,
  otpVerified: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case OTP_GENERATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userType: action.payload.email,
      };
    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpVerified: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('basis-token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case OTP_VERIFY_FAIL:
    case OTP_GENERATE_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('basis-token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
