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
export const loadUser = () => (dispatch, getState) => {
  // set loading
  dispatch(setLoading());

  axios
    .get('api/auth/user')
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User
export const register = ({ firstName, lastName, email, referredBy }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ firstName, lastName, email, referredBy });

  axios
    .post('api/users/signup', body, config)
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );

      dispatch({ type: REGISTER_FAIL });
    });
};

export const generateOTP = (email) => (dispatch) => {
  dispatch(setLoading());

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email });

  axios
    .post('api/users/otp/generate', body, config)
    .then((res) => dispatch({ type: OTP_GENERATE_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'OTP_GENERATE_FAIL'
        )
      );

      dispatch({ type: OTP_GENERATE_FAIL });
    });
};

export const verifyOTP = (email, otp) => (dispatch) => {
  dispatch(setLoading());

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, otp });

  axios
    .post('api/auth/otp', body, config)
    .then((res) => {
      if (res.data.token) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: OTP_VERIFY_SUCCESS });
      }
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'OTP_VERIFY_FAIL')
      );

      dispatch({ type: OTP_VERIFY_FAIL });
    });
};

export const validate_referralCode = (referralCode) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ referralCode });

  axios
    .post('api/users/referral/verify', body, config)
    .then((res) => {
      dispatch({
        type: REFERRAL_VALIDATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'REFERRAL_VALIDATION_FAIL'
        )
      );

      dispatch({
        type: REFERRAL_VALIDATION_FAIL,
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
