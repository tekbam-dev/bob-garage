// File: src/routes/optionsroute.js
// This file holds the routes for options
// It holds the routes for:
// add: /api/option/add
// Type: private
//  debug purpose obly )
// getAllOptions: /api/options
// type: private
// Returns option
// Update: /api/options/edit/1
// type: private ()
// Always return option with record 1 because new record not allowed


import express from 'express';
import db from '../models/index.js';
import validateOptions from '../validator/options-validator.js'; // Import the Joi validation function
// const express = require('express');
// const db = require('../models');
// Bring in middleware
// const auth = require('../middleware/auth');

const router = express.Router();

const { Options } = db.sequelize.models;

// POST route to add a new option
router.post("/option/add", async (req, res) => {
  const { error } = validateOptions(req.body);  // Validate the incoming request body
  
  if (error) {
    return res.status(400).json({
      error: "Validation Error",
      message: error.details[0].message,
    });
  }

  const { options_banner_image, option_banner_text, option_banner_overlay } = req.body;

  // Create a new option record
  Options.create({
    options_banner_image,
    option_banner_text,
    option_banner_overlay,
  })
    .then((newOption) => {
      // Respond with the created option
      res.status(201).json(newOption);
      console.log('New Option has been added !');
    })
    .catch((error) => {
      console.error("Error creating option:", error);
      res.status(500).send("Internal Server Error");
    });
});

// GET route to fetch all options
router.get("/options", async (req, res) => {
  try {
    const options = await Options.findAll(); // Fetch all records from the Options table
    res.json(options); // Send the data as a JSON response
  } catch (error) {
    console.error("Error fetching options:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT route to update option
router.put("/option/edit", async (req, res) => {
  console.log("Option update ran");

  const { error } = validateOptions(req.body);  // Validate the incoming request body
  
  if (error) {
    return res.status(400).json({
      error: "Validation Error",
      message: error.details[0].message,
    });
  }

  console.log(req.body);

  const { options_banner_image, option_banner_text, option_banner_overlay } = req.body;

  try {
    const option_Id = 1; // Since there's only one record, we know the ID is always 1

    // Find the option by ID and update it
    const updated = await Options.update(
      {
        options_banner_image,
        option_banner_text,
        option_banner_overlay,
      },
      { where: { id: option_Id } }
    );

    if (updated) {
      // If the option was updated, send a success response
      res.status(200).json({ message: "Option updated successfully" });
    } else {
      res.status(404).json({ message: 'Option not found' });
    }
  } catch (error) {
    console.error("Error updating option:", error);
    res.status(500).json({ error: 'Failed to update option' });
  }
});

// Export the router
export default router;
