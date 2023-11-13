// Import the 'User' model from the '../models/User.js' file.
import User from "../models/User.js";

// Import 'bcrypt' for password hashing, 'createError' for error handling, and 'jsonwebtoken' for JWT token generation.
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Function for user registration.
export const register = async (req, res, next) => {
    try {
        // Generate a salt and hash the user's password using 'bcrypt'.
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create a new 'User' instance with the hashed password and other user details from the request body.
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        // Save the new user to the database.
        await newUser.save();

        // Respond with a 200 OK status and a message indicating successful user creation.
        res.status(200).send("User has been created.");
    } catch (err) {
        // If an error occurs, pass it to the next middleware for error handling.
        next(err);
    }
};

// Function for user login.
export const login = async (req, res, next) => {
    try {
        // Find a user in the database by their username.
        const user = await User.findOne({ username: req.body.username });

        // If the user is not found, return a 404 error.
        if (!user) return next(createError(404, "User not found!"));

        // Compare the provided password with the stored hashed password using 'bcrypt'.
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        // If the password is incorrect, return a 400 error.
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        // Generate a JWT token with the user's ID and isAdmin status.
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        // Extract sensitive user details (password and isAdmin) and send the rest in the response.
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Set the JWT token as an HTTP-only cookie for secure authentication.
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        // If an error occurs, pass it to the next middleware for error handling.
        next(err);
    }
};