// Import the 'express' module to create a web server.
import express from "express";

// Import the 'login' and 'register' functions from the 'auth.js' file located in the '../controllers/' directory.
import { login, register } from "../controllers/auth.js";

// Create an instance of an Express Router.
const router = express.Router();

// Define a route for handling HTTP POST requests to '/register'.
// When a POST request is made to this route, the 'register' function from the 'auth.js' file will be executed.
router.post("/register", register);

// Define a route for handling HTTP POST requests to '/login'.
// When a POST request is made to this route, the 'login' function from the 'auth.js' file will be executed.
router.post("/login", login);

// Export the 'router' object, making it available for use in other parts of the application.
export default router;