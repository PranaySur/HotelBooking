// Import the 'express' module to create a web server.
import express from "express";

// Import various functions from the 'user.js' file located in the '../controllers/' directory.
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

// Import the 'verifyAdmin' and 'verifyUser' functions from the 'verifyToken.js' file located in the '../utils/' directory.
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

// Create an instance of an Express Router.
const router = express.Router();

// Define a route for handling HTTP PUT requests with a parameter ':id'.
// This route is protected by the 'verifyUser' middleware, ensuring only authenticated users can access it.
// When a PUT request is made to this route with an 'id' parameter, it will execute the 'updateUser' function.
router.put("/:id", verifyUser, updateUser);

// Define a route for handling HTTP DELETE requests with a parameter ':id'.
// This route is protected by the 'verifyUser' middleware, ensuring only authenticated users can access it.
// When a DELETE request is made to this route with an 'id' parameter, it will execute the 'deleteUser' function.
router.delete("/:id", verifyUser, deleteUser);

// Define a route for handling HTTP GET requests with a parameter ':id'.
// This route is protected by the 'verifyUser' middleware, ensuring only authenticated users can access it.
// When a GET request is made to this route with an 'id' parameter, it will execute the 'getUser' function.
router.get("/:id", verifyUser, getUser);

// Define a route for handling HTTP GET requests to '/'.
// This route is protected by the 'verifyAdmin' middleware, ensuring only admins can access it.
// When a GET request is made to this route, it will execute the 'getUsers' function.
router.get("/", verifyAdmin, getUsers);

// Export the 'router' object, making it available for use in other parts of the application.
export default router;