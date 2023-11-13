// Import the 'express' module to create a web server.
import express from "express";

// Import various functions from the 'room.js' file.
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";

// Import the 'verifyAdmin' function from the 'verifyToken.js' file.
import { verifyAdmin } from "../utils/verifyToken.js";

// Create an instance of an Express Router.
const router = express.Router();

// Define a route for handling HTTP POST requests with a parameter ':hotelid'.
// This route is protected by the 'verifyAdmin' middleware, ensuring only admins can access it.
// When a POST request is made to this route with a 'hotelid' parameter, it will execute the 'createRoom' function.
router.post("/:hotelid", verifyAdmin, createRoom);

// Define a route for handling HTTP PUT requests with a parameter '/availability/:id'.
// When a PUT request is made to this route with an 'id' parameter, it will execute the 'updateRoomAvailability' function.
router.put("/availability/:id", updateRoomAvailability);

// Define a route for handling HTTP PUT requests with a parameter ':id'.
// This route is protected by the 'verifyAdmin' middleware.
// When a PUT request is made to this route with an 'id' parameter, it will execute the 'updateRoom' function.
router.put("/:id", verifyAdmin, updateRoom);

// Define a route for handling HTTP DELETE requests with parameters ':id' and ':hotelid'.
// This route is protected by the 'verifyAdmin' middleware, ensuring only admins can access it.
// When a DELETE request is made to this route with 'id' and 'hotelid' parameters, it will execute the 'deleteRoom' function.
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// Define a route for handling HTTP GET requests with a parameter ':id'.
// When a GET request is made to this route with an 'id' parameter, it will execute the 'getRoom' function.
router.get("/:id", getRoom);

// Define a route for handling HTTP GET requests to '/'.
// When a GET request is made to this route, it will execute the 'getRooms' function.
router.get("/", getRooms);

// Export the 'router' object, making it available for use in other parts of the application.
export default router;