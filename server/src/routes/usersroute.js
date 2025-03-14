// File: src/routes/usersroute.js
// This file holds the routes for user
// It holds the routes for:
// add: /api/user/add
// Type: private
// Allows users to post user
// getAlluser: /api/user
// type: private
// Returns all user
// getById: /api/user/edit/:id
// type: private
// Get single user item
// update: /api/user/edit/:id
// type: private
// update single user item
// delete: /api/user/delete/:id
// type: private
// delete single user item


import express from "express";
import db from "../models/index.js";
import  validateUser from "../validator/user-validator.js"; // Import the Joi validation
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";


const router = express.Router();

const { Users } = db.sequelize.models;

// Get All Users
router.get("/users", async(req, res) => {

  console.log(`Inside the user route - Get All`)

  const options = {
    attributes: { exclude: ['user_password']}
  };
  try {
    const users = await Users.findAll(options); // Fetch all users from the Users table
    res.json(users); // Send the data as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single user by ID
router.get("/user/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await Users.findOne({ where: { user_id: userId } });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Create a new user
router.post("/user/add", async (req, res) => {
  const { error } = validateUser(req.body.newUserData); // Validate the incoming user data

  if (error) {
    return res.status(400).json({
      error: "Validation Error",
      message: error.details[0].message,
    });
  }

  

  const { user_fn, user_ln, user_pp, user_email, user_password, user_isadmin } = req.body.newUserData;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    const newUser = await Users.create({
      user_fn,
      user_ln,
      user_pp,
      user_email,
      user_password: hashedPassword,
      user_isadmin,
    });

    if (!newUser) {
      return res.status(400).send("Failed to create user");
    }

    console.log("User Created");
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).send(error.message);
  }
});










// Update an existing user
router.put("/user/edit/:id", async (req, res) => {
  
  console.log(`user edit route - PUT`)
  console.log(req.body);

  const { error } = validateUser(req.body); // Validate the incoming update data

  if (error) {
    return res.status(400).json({
      error: "Validation Error",
      message: error.details[0].message,
    });
  }

  const userId = Number(req.params.id);

  const { user_fn, user_ln, user_pp, user_isadmin, user_email, user_password } = req.body;

  console.log(user_fn);

  console.log(`User pass ${user_password}`);
  try {
    let updateUser = { user_fn, user_ln, user_pp, user_isadmin, user_email,user_password };

  

    // If the password is provided, hash it
    if (user_password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user_password, salt);
      updateUser = {
        ...updateUser,
        user_password : hashedPassword
      }
        
    }

    const [updated] = await Users.update(updateUser, { where: { user_id: userId } });

    if (updated) {
      const updatedUser = await Users.findOne({ where: { user_id: userId } });
      res.status(200).json({ user: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});


// Delete a user
router.delete("/user/delete/:id", async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const user = await Users.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Users.destroy({ where: { user_id: userId } });
    res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Export the router
export default router;
