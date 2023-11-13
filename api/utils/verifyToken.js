// Import the 'jsonwebtoken' module for JWT handling and the 'createError' function from the 'error.js' file.
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// Middleware function for verifying a user's JWT token.
export const verifyToken = (req, res, next) => {
    // Retrieve the JWT token from the 'access_token' cookie in the request.
    const token = req.cookies.access_token;

    // If no token is found, return an authentication error.
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    // Verify the token using the secret key (process.env.JWT) and decode it.
    jwt.verify(token, process.env.JWT, (err, user) => {
        // If there's an error during token verification, return a token validation error.
        if (err) return next(createError(403, "Token is not valid!"));

        // If the token is valid, store the 'user' object from the token in the 'req' object for future use.
        req.user = user;

        // Continue processing the request by calling the 'next' middleware function.
        next();
    });
};

// Middleware function for verifying if a user is authorized (based on their token).
export const verifyUser = (req, res, next) => {
    // Use the 'verifyToken' middleware to ensure the user is authenticated.
    verifyToken(req, res, () => {
        // Check if the user's 'id' matches the 'id' provided in the request parameters or if the user is an admin.
        if (req.user.id === req.params.id || req.user.isAdmin) {
            // If authorized, continue processing the request.
            next();
        } else {
            // If not authorized, return an authorization error.
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// Middleware function for verifying if a user is an admin (based on their token).
export const verifyAdmin = (req, res, next) => {
    // Use the 'verifyToken' middleware to ensure the user is authenticated.
    verifyToken(req, res, () => {
        // Check if the user has admin privileges.
        if (req.user.isAdmin) {
            // If the user is an admin, continue processing the request.
            next();
        } else {
            // If not an admin, return an authorization error.
            return next(createError(403, "You are not authorized!"));
        }
    });
};