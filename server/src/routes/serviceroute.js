/**
 * File: src/routes/serviceroute.js
 * This file holds the routes for services. It holds the routes for:
 * POST: /api/service/add - Type: private - Allows users to post service
 * GET : /api/service - type: public - Returns all service
 * GET : /api/service/:id - type: private - GET single service item
 * PUT: /api/service/edit/:id - type: private - update single service item
 * Delete: /api/service/delete/:id type: private - Delete single service item

Bring in required modules
*/
import express from "express";
import db from "../models/index.js";
import validateService from "../validator/service-validator.js";
// const express = require('express');
// const db = require('../models');
// Bring in middleware
// const auth = require('../middleware/auth');

const router = express.Router();

const { Services } = db.sequelize.models;

// Get All Services

/**
 * API routes to get requests
 */

router.get("/services", async (req, res) => {
  try {
    const services = await Services.findAll(); // Fetch all records from the Service table
    res.json(services); // Send the data as a JSON response
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get request to get service based on the ID
router.get("/service/:id", async (req, res) => {
  //    console.log(req.params.id);

  const serviceId = parseInt(req.params.id);
  console.log(serviceId);
  try {
    const updatedService = await Services.findOne({
      where: { service_id: serviceId },
    });
    res.status(200).json({ service: updatedService });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "Failed to get service" });
  }
});

/**
 * All post request started from here
 */

router.post("/service/add", async (req, res) => {
  try {
    const validateData = validateService(req.body);

    const {
      service_title,
      service_description,
      service_thumbnail,
      service_text,
      service_price,
    } = validateData;

    // Create a new service record
    // Create a new service record using promise chaining
    Services.create({
      service_title,
      service_description,
      service_thumbnail,
      service_text,
      service_price,
    })
      .then((newService) => {
        // Respond with the created service
        res.status(201).json(newService);
        console.log("New Service has been added !");
      })
      .catch((error) => {
        console.error("Error creating service:", error);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    // Catch Joi validation error and respond with a 400 error and the message
    console.error("Validation Error:", error.message);
    res.status(400).json({
      error: "Invalid Data",
      message: error.message,
    });
  }
});

//Put Requests  to udpate the service information

router.put("/service/edit/:id", async (req, res) => {
  console.log(req.body);

  try {
    const validateData = validateService(req.body);
    const serviceId = parseInt(req.params.id);

    const {
      service_title,
      service_description,
      service_thumbnail,
      service_text,
      service_price,
    } = validateData;

    // Find the service by ID and update it
    const [updated] = await Services.update(
      {
        service_title,
        service_description,
        service_thumbnail,
        service_text,
        service_price,
      },
      { where: { service_id: serviceId } }
    );

    if (updated) {
      // If the service was updated, send success response
      const updatedService = await Services.findOne({
        where: { service_id: serviceId },
      });
      res.status(200).json({ service: updatedService });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    // Handle any errors
    if (error.isJoi) {
      // Joi validation error
      res.status(400).json({
        error: "Invalid Data",
        message: error.details[0].message,
      });
    } else {
      // Handle any unexpected errors
      console.error("Error updating service:", error);
      res.status(500).json({ error: "Failed to update service" });
    }
  }

  //  res.send("Edit service by  ID");
});

router.delete("/service/delete/:id", async (req, res) => {
  console.log(req.params);

  const serviceId = Number(req.params.id);
  const service = await Services.findOne({ where: { service_id: serviceId } });

  try {
    const deleted = await Services.destroy({
      where: { service_id: serviceId },
    });

    if (deleted) {
      res.status(200).json({ service });
      // res.send(`Service with ID ${serviceId} was deleted successfully.`);
    } else {
      res.send(`No service found with ID ${serviceId}.`);
    }
  } catch (error) {
    res.send("Error deleting service:", error);
  }
});

//All delete request

router.delete("/service/delete", async (req, res) => {
  res.send("Delete All services ");
});

// Export the router
export default router;
