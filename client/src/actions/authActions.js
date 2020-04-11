import axios from 'axios';
import { returnErrors } from './errorActions';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  OTP_GENERATE_SUCCESS,
  OTP_GENERATE_FAIL,
  OTP_VERIFY_FAIL,
  OTP_VERIFY_SUCCESS,
  SET_LOADING,
  LOGIN_SUCCESS,
  REFERRAL_VALIDATION_FAIL,
  REFERRAL_VALIDATION_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './types.js';

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
//check token & load user
export const loadUser = () => async (dispatch) => {
  // set loading
  dispatch(setLoading());

  try {
    const res = await axios.get('api/auth/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(err.response.data.msg, err.response.status, 'AUTH_ERROR')
    );
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = (newUser) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.post('api/users/signup', newUser);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL')
    );

    dispatch({ type: REGISTER_FAIL });
  }
};

export const generateOTP = (email) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.post('api/users/otp/generate', { email });

    dispatch({
      type: OTP_GENERATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.msg,
        err.response.status,
        'OTP_GENERATE_FAIL'
      )
    );

    dispatch({ type: OTP_GENERATE_FAIL });
  }
};

export const verifyOTP = (email, otp) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.post('api/auth/otp', { email, otp });

    if (res.data.token) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: OTP_VERIFY_SUCCESS });
    }
  } catch (error) {
    dispatch(
      returnErrors(
        err.response.data.msg,
        err.response.status,
        'OTP_VERIFY_FAIL'
      )
    );

    dispatch({ type: OTP_VERIFY_FAIL });
  }
};

export const validate_referralCode = (referralCode) => async (dispatch) => {
  try {
    const res = await axios.post('api/users/referral/verify', { referralCode });

    dispatch({
      type: REFERRAL_VALIDATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.msg,
        err.response.status,
        'REFERRAL_VALIDATION_FAIL'
      )
    );

    dispatch({
      type: REFERRAL_VALIDATION_FAIL,
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
