/**
 * @author Tek Bam
 * @description This route is not in use for now but will be in future update
 * @version 2.0.0
 */


/**
 * File: src/routes/socialroutes.js
 * This file holds the routes for socials. It holds the routes for:
 * POST: /api/social/add - Type: private - Allows users to post social
 * GET : /api/social - type: public - Returns all social
 * GET : /api/social/:id - type: private - GET single social item
 * PUT: /api/social/edit/:id - type: private - update single social item
 * DELETE: /api/social/delete/:id - type: private - Delete single social item
 * 
 * Bring in required modules
 */
import express from 'express';
import db from '../models/index.js';
import validateSocial from '../validator/social-validator.js'; // Import the Joi validator

const router = express.Router();

const { Socials } = db.sequelize.models;

/**
 * Get All Socials 
 * API route to fetch all social entries from the database
 */
router.get("/socials", async (req, res) => {
  try {
    const socials = await Socials.findAll(); // Fetch all records from the Social table
    res.json(socials); // Send the data as a JSON response
  } catch (error) {
    console.error("Error fetching socials:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Get request to fetch a single social by its ID 
 * API route to fetch a specific social entry based on the provided ID
 */
router.get("/social/:id", async (req, res) => {
  const socialId = parseInt(req.params.id);

  try {
    const updatedSocial = await Socials.findOne({ where: { social_id: socialId } });
    if (updatedSocial) {
      res.status(200).json({ social: updatedSocial });
    } else {
      res.status(404).json({ error: 'Social not found' });
    }
  } catch (error) {
    console.error("Error fetching social:", error);
    res.status(500).json({ error: 'Failed to get social' });
  }
});

/**
 * POST request to add a new social 
 * API route to create a new social entry with a social_icon and social_handler
 */
router.post("/social/add", async (req, res) => {
  try {
    // Validate the incoming request body using Joi
    const validatedData = validateSocial(req.body);
    
    const { social_icon, social_handler } = validatedData;

    // Create a new social record
    const newSocial = await Socials.create({
      social_icon,
      social_handler
    });

    res.status(201).json(newSocial);
    console.log('New Social has been added!');
  } catch (error) {
    console.error("Error creating social:", error);
    if (error.message.startsWith('Validation error')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

/**
 * PUT request to update a social entry
 * API route to update the information of an existing social based on its ID
 */
router.put("/social/edit/:id", async (req, res) => {
  try {
    const socialId = Number(req.params.id);
    const { social_icon, social_handler } = req.body;

    // Validate the incoming request body using Joi
    const validatedData = validateSocial({ social_icon, social_handler });

    // Find the social by ID and update it
    const [updated] = await Socials.update(
      validatedData,
      { where: { social_id: socialId } }
    );

    if (updated) {
      const updatedSocial = await Socials.findOne({ where: { social_id: socialId } });
      res.status(200).json({ social: updatedSocial });
    } else {
      res.status(404).json({ message: 'Social not found' });
    }
  } catch (error) {
    console.error("Error updating social:", error);
    if (error.message.startsWith('Validation error')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update social' });
    }
  }
});

/**
 * DELETE request to remove a social entry
 * API route to delete a social entry based on the provided ID
 */
router.delete("/social/delete/:id", async (req, res) => {
  const socialId = Number(req.params.id);

  try {
    const social = await Socials.findOne({ where: { social_id: socialId } });

    if (social) {
      await Socials.destroy({
        where: { social_id: socialId }
      });
      res.status(200).json({ message: `Social with ID ${socialId} deleted successfully` });
    } else {
      res.status(404).json({ message: 'Social not found' });
    }
  } catch (error) {
    console.error("Error deleting social:", error);
    res.status(500).json({ error: 'Error deleting social' });
  }
});

// Export the router
export default router;
