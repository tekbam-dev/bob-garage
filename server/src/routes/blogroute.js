/**
 * File: src/routes/blogroute.js
 * This file holds the routes for blogs. It holds the routes for:
 * POST: /api/blog/add - Type: private - Allows users to post blog
 * GET : /api/blog - type: public - Returns all blog
 * GET : /api/blog/:id - type: private - GET single blog item
 * PUT: /api/blog/edit/:id - type: private - update single blog item
 * Delete: /api/blog/delete/:id type: private - Delete single blog item

Bring in required modules
*/
import express from "express";
import db from "../models/index.js";

import validateBlog from "../validator/blog-validator.js";

// Bring in middleware
// import auth from '../middleware/auth';

const router = express.Router();
//Destructring models
const { Blogs } = db.sequelize.models;

// Get All blogs for the blog page

router.get("/blogs/", async (req, res) => {
  let sortMethod =
    req.query.sort == "ASC" || req.query.sort == "DESC"
      ? req.query.sort
      : "ASC";
  // console.log( `sortmethod ${sortMethod}`)

  try {
    const blogs = await Blogs.findAll({
      order: [["createdAt", sortMethod]],
    }); // Fetch all records from the Blog table

    res.json(blogs); // Send the data as a JSON response
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get blog by ID to display single blog on the page based on the user click

router.get("/blog/:id", async (req, res) => {
  const blogID = req.params.id;

  try {
    const blog = await Blogs.findOne({
      where: { blog_id: blogID },
    });

    if (blog) {
      res.status(200).json({ blog });
    } else {
      res.send("Blog not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Faild to get blog" });
  }
});

//Update blog by id  ( after accessing as admin )
router.put("/blog/edit/:id", async (req, res) => {
  try {
    const validateData = validateBlog(req.body);
    const blogId = parseInt(req.params.id);

    const { blog_title, blog_description, blog_thumbnail } = validateData;

    // Find the blog by ID and update it
    const [updated] = await Blogs.update(
      {
        blog_title,
        blog_description,
        blog_thumbnail,
      },
      { where: { blog_id: blogId } }
    );

    if (updated) {
      // If the blog was updated, send success response
      const updatedBlog = await Blogs.findOne({ where: { blog_id: blogId } });

      res.status(200).json({ blog: updatedBlog });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    // Handle any errors
    if (error.message.includes("Joi Validation error")) {
      return res.status(400).json({
        error: "Invalid Data",
        message: error.message,
      });
    }
  }
});

// Create new blog ( only admin can create a blog )
router.post("/blog/add", (req, res) => {
  const validateData = validateBlog(req.body);

  const { blog_title, blog_description, blog_thumbnail } = validateData;

  // Create a new blog record
  // Create a new blog record using promise chaining
  Blogs.create({
    blog_title,
    blog_description,
    blog_thumbnail,
  })
    .then((newBlog) => {
      // Respond with the created blog
      res.status(201).json(newBlog);
      console.log("New Blog has been added !");
    })
    .catch((error) => {
      console.error("Error creating blog:", error);

      // If the error is from Joi validation, send a 400 response
      if (error.message.includes("Joi Validation error")) {
        return res.status(400).json({
          error: "Invalid Data",
          message: error.message,
        });
      }

      // Handle other errors (e.g., database issues) with a 500 response
      res.status(500).send("Internal Server Error");
    });
});

// Delete blog by ID
router.delete("/blog/delete/:id", async (req, res) => {
  // const {id} = req.body;
  const blogId = Number(req.params.id);
  console.log(typeof blogId);

  const blog = await Blogs.findOne({ where: { blog_id: blogId } });
  if (blog) {
    try {
      const deleted = await Blogs.destroy({
        where: { blog_id: blogId },
      });

      if (deleted) {
        res.status(200).json({ blog });
        // res.send(`Blog with ID ${blogId} was deleted successfully.`);
      } else {
        res.send(`No blog found with ID ${blogId}.`);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog" });
    }
  } else {
    console.log("Blog not found");
  }
});





// Export the router
export default router;
