// File: src/routes/authroute.js
// This file holds the routes for authentication
// It holds the routes for:
// Login: /api/auth/login
// Type: public
// Allows users to login
// loadUser: /api/auth
// type: private
// Returns the details of the logged in user
// Register: /api/auth/register
// type: public
// Allows a user to register.

// Require our needed modules
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js'
import db from '../models/index.js';
import auth from '../middleware/auth.js';
import { registerValidationSchema, loginValidationSchema } from '../validator/auth-validator.js';

const router = express.Router();

// Pull out the user model from the database.
const { Users } = db.sequelize.models;

// Name: Login
// Path: /api/auth/login
// Request: POST
// Type: Public route.
// Description: This route allows a user to login.
router.post('/auth/login', async (req, res) => {

  // Log out the path
  console.log('/auth/login - POST');
  // Destructure req.body.
  const { email, password } = req.body;

  try {
    // Validate the request body using Joi schema for login
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: [{ msg: error.details[0].message }] });
    }

    // Check if the user exists in the database
    let userRes = await Users.findOne({ where: { user_email: email } });

    // If the user is not in the database, send back a message.
    if (!userRes) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // Check to see if the entered password is the same as the password stored in the database for this user.
    const isMatch = await bcrypt.compare(password, userRes.user_password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // After comparing passwords, we can send a token to the client.
    const payload = {
      user: {
        userId: userRes.user_id,
        userFirstName: userRes.user_fn,
        userLastName: userRes.user_ln,
        userEmail: userRes.user_email,
        userProfilePic: userRes.user_pp,
        userIsAdmin: userRes.user_isadmin,
        userDarkMode: userRes.user_ismode_dark,
      }
    };

    // Sign the token
    const token = jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS512'
    });

    console.log(`Token Created: ${token}`);

    res.json({ token });

  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// Name: loadUser
// Path: /api/auth
// Request: GET
// Type: Private
// Description: This route will get the current logged-in user.
router.get('/auth', auth, async (req, res) => {
  console.log('/api/auth - GET');
  const options = {
    attributes: { exclude: ['user_password'] }
  };

  try {
    const user = await Users.findByPk(req.user.userId, options);
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// Name: Register
// Path: /api/auth/register
// Request: POST
// Type: Public route
// Description: This route allows a user to register.
router.post('/auth/register', async (req, res) => {

  console.log('/api/auth/register - POST');

  console.log(req.body);

  const { firstName, lastName, email, image, password } = req.body;

  try {
    // Validate the request body using Joi schema for registration
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ errors: [{ msg: error.details[0].message }] });
    }

    // Check if the user already exists
    let user = await Users.findOne({ where: { user_email: email } });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already registered' }] });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const userRes = await Users.create({
      user_fn: firstName,
      user_ln: lastName,
      user_email: email,
      user_pp: image,
      user_password: hashedPassword,
    });

    console.log(`User Created ${userRes}`);

    const payload = {
      user: {
        userId: userRes.user_id,
        userFirstName: userRes.user_fn,
        userLastName: userRes.user_ln,
        userEmail: userRes.user_email,
        userProfilePic: userRes.user_pp,
        userIsAdmin: false,
        userDarkMode: false,
      }
    };

    const token = jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS512'
    });

    console.log(`Token Created: ${token}`);
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// Export the router
export default router;
