// File: src/middleware/auth.js
// This file will check if we have a token, or not. And will pass back messages based on the token.
// We require Jsonwebtoken and our JWT secret for this to work.

// import JWT, our config.
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// const jwt = require('jsonwebtoken');
// const config = require('../config/config');

// Create our export function
// Note: unlike our endpoints, our function here has 3 parameters, a request, a response and next.
// All middleware must have the next parameter.
 const auth = (req, res, next)=>{
  // Get the token from the header.
  // Remember that we set up our axios requests to have the x-auth-token in the request headers in our client.
  console.log("auth.js middleware")
  console.log(req.header('x-auth-token'));
  const token = req.header('x-auth-token');
  // console.log(token)

  if(!token){
    // if there is no token, or it is wrong, send that the user is not authorised for this route.
    return res.status(401).json({ msg: 'No token, authorisation denied'});
  }

  // Verify the token.
  // If we have a token, use the verfiy function to check the token.
  // The verify function takes in 2 parameters, a token, and the secret used to encode the token.
  try {
    console.log('Decoding token....')
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    req.user = decoded.user;
    console.log('Decoded user');
    // console.log(req.user);
    // Call the next piece of middleware.
    // Middleware can be chained and we can call a many pieces of middleware as required.
    console.log(`going to next`);
    next();
  } catch (error) {
    // catch the errors from the verify function and send a message
    res.status(401).json({ msg: 'Token is not valid'});
  }
}

// Note: status 401 = Unauthorised.
export default auth;