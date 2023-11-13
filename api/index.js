import express from "express";  // Express.js framework for building web applications
import dotenv from "dotenv";    // Load environment variables from a .env file
import mongoose from "mongoose";  // MongoDB object modeling tool
import authRoute from "./routes/auth.js";  // Import authentication route
import usersRoute from "./routes/users.js";  // Import users route
import hotelsRoute from "./routes/hotels.js";  // Import hotels route
import roomsRoute from "./routes/rooms.js";  // Import rooms route
import cookieParser from "cookie-parser";  // Parse cookies in incoming requests
import cors from "cors";  // Enable Cross-Origin Resource Sharing (CORS)

// Create an instance of Express application
const app = express();
dotenv.config();  // Load environment variables from .env file

// Function to establish an initial connection to the MongoDB database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);  // Connect to MongoDB using the URI from the environment variables
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error; // If there is no initial connection no need to go forward
    }
};

// Event listener for when MongoDB connection is disconnected (after initial connection)
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

// Middlewares
app.use(cors());  // Enable CORS for all routes
app.use(cookieParser());  // Parse cookies in incoming requests
app.use(express.json());  // Parse incoming JSON data

// Set up routes
app.use("/api/auth", authRoute);  // Mount the authentication route
app.use("/api/users", usersRoute);  // Mount the users route
app.use("/api/hotels", hotelsRoute);  // Mount the hotels route
app.use("/api/rooms", roomsRoute);  // Mount the rooms route

// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;  // Get the HTTP status code from the error or default to 500
    const errorMessage = err.message || "Something went wrong!";  // Get the error message or default message
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,  // Include the error stack trace
    });
});

// Start the Express app by listening on port 8800
app.listen(8800, () => {
    connect();  // Establish a connection to the MongoDB database
    console.log("Connected to backend.");
});