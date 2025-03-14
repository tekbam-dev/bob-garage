// File: src/utils/setAuthToken.js
// This file will set our token to be sent in our http headers whenever we send a http request from the client-side.

// import axios
import axios from "axios";

// Create our authToken funciton.
// this function will take in the token and return nothing.
const setAuthToken = (token) => {
  // Test that the token is passed through

  // Check if we have a token
  if (token) {
    // If we do have a token, add the token to the axios requests in the http header, under the property 'x-auth-token'.
    // This will create a key value pair: 'x-auth-token': token
    return (axios.defaults.headers.common["x-auth-token"] = token);
  } else {
    // If we don't have a token, remove the key value pair from the http headers
    return delete axios.defaults.headers.common["x-auth-token"];
  }
};

// export the function
export default setAuthToken;
