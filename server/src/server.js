// Bring in express and required modules
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "path";
// import { Sequelize } from "sequelize";

import {
  serviceRouter,
  userRouter,
  blogRouter,
  feedbackRouter,
  socialRouter,
  optionRouter,
  authRouter,
} from "./routes/index.js";

// bring in our configuration

import db from "./models/index.js";

// const bcrypt = require ('bcrypt');

// const jwt = require('jsonwebtoken');

// Initialise express app variable
const app = express();

// 6. Open config/config.js
// 10. Remove the dotenv imports.
// 11. Done.

// Initialise middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Creating route for CRUD operation - Test route
app.get("/test", (req, res) => {
  //logout the path and the request

  console.log("/ - get");
  // use res.send to send a response
  const rootDir = process.cwd();
  const filePath = path.join(rootDir, "index.html");
  console.log("file" + filePath);
  res.send(filePath);
});

// Crating new user

app.use("/api", userRouter);
app.use("/api", serviceRouter);
app.use("/api", blogRouter);
app.use("/api", feedbackRouter);
app.use("/api", optionRouter);
app.use("/api", socialRouter);
app.use("/api", authRouter);

// console.log(serviceRouter);rs

// Creating a port variable
const PORT = process.env.PORT;

// This code will check if we hav a port environment variabl set
//otherwise it will use 3001

//Update our listen so we can sync to our databse.
//We use the sync() functins.
//Listen for the request

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
