// Import the 'express' module to create a web server.
import express from "express";

// Import various functions from the 'hotel.js' file.
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,
} from "../controllers/hotel.js";

// Import the 'verifyAdmin' function from the 'verifyToken.js' file.
import { verifyAdmin } from "../utils/verifyToken.js";

// Create an instance of an Express Router.
const router = express.Router();

// Define a route for handling HTTP POST requests to '/'.
// This route is protected by the 'verifyAdmin' middleware, which verifies if the user is an admin.
// If the user is an admin, the 'createHotel' function will be executed to create a new hotel.
router.post("/", verifyAdmin, createHotel);

// Define a route for handling HTTP PUT requests with a parameter ':id'.
// This route is also protected by the 'verifyAdmin' middleware.
// When a PUT request is made to this route with an 'id' parameter, it will execute the 'updateHotel' function.
router.put("/:id", verifyAdmin, updateHotel);

// Define a route for handling HTTP DELETE requests with a parameter ':id'.
// This route is protected by the 'verifyAdmin' middleware.
// When a DELETE request is made to this route with an 'id' parameter, it will execute the 'deleteHotel' function.
router.delete("/:id", verifyAdmin, deleteHotel);

// Define a route for handling HTTP GET requests with a parameter '/find/:id'.
// When a GET request is made to this route with an 'id' parameter, it will execute the 'getHotel' function.
router.get("/find/:id", getHotel);

// Define a route for handling HTTP GET requests to '/'.
// When a GET request is made to this route, it will execute the 'getHotels' function.
router.get("/", getHotels);

// Define a route for handling HTTP GET requests to '/countByCity'.
// When a GET request is made to this route, it will execute the 'countByCity' function.
router.get("/countByCity", countByCity);

// Define a route for handling HTTP GET requests to '/countByType'.
// When a GET request is made to this route, it will execute the 'countByType' function.
router.get("/countByType", countByType);

// Define a route for handling HTTP GET requests with a parameter '/room/:id'.
// When a GET request is made to this route with an 'id' parameter, it will execute the 'getHotelRooms' function.
router.get("/room/:id", getHotelRooms);

// Export the 'router' object, making it available for use in other parts of the application.
export default router;