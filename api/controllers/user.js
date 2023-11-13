// Import the "User" model from the "User.js" file.
import User from "../models/User.js";

// Function for updating an existing user based on their ID.
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        // Respond with a 200 OK status and the updated user data.
        res.status(200).json(updatedUser);
    } catch (err) {
        // If an error occurs, pass it to the next middleware for error handling.
        next(err);
    }
};

// Function for deleting a user based on their ID.
export const deleteUser = async (req, res, next) => {
    try {
        // Delete the user by their ID.
        await User.findByIdAndDelete(req.params.id);
        // Respond with a 200 OK status and a message indicating successful user deletion.
        res.status(200).json("User has been deleted.");
    } catch (err) {
        // If an error occurs, pass it to the next middleware for error handling.
        next(err);
    }
};

// Function for retrieving a user by their ID.
export const getUser = async (req, res, next) => {
    try {
        // Retrieve a user by their ID.
        const user = await User.findById(req.params.id);
        // Respond with a 200 OK status and the user data.
        res.status(200).json(user);
    } catch (err) {
        // If an error occurs, pass it to the next middleware for error handling.
        next(err);
    }
};

// Function for retrieving a list of all users.
export const getUsers = async (req, res, next) => {
    try {
        // Retrieve a list of all users.
        const users = await User.find();
        // Respond with a 200 OK status and the list of users.
        res.status(200).json(users);
    } catch (err) {
        // If an error occurs, pass it to the next middleware for error handling.
        next(err);
    }
};