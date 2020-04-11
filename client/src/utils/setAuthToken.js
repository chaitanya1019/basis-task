import axios from 'axios';

//Set custom token headers
const setAuthToken = (token) => {
  if (token) {
    // token present
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    //token not present
    // delete custom header of that token
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
