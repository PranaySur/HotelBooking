// Import the 'mongoose' library, which allows us to work with MongoDB.
import mongoose from "mongoose";

// Define a new Mongoose schema for the "User" model.
const UserSchema = new mongoose.Schema({
    // Define the "username" field with properties such as type, required, and uniqueness.
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // Define the "email" field with properties such as type, required, and uniqueness.
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Define the "country" field with the "type" set to String and "required" set to true.
    country: {
        type: String,
        required: true,
    },
    // Define the "img" (image) field with the "type" set to String.
    img: {
        type: String,
    },
    // Define the "city" field with properties similar to "country".
    city: {
        type: String,
        required: true,
    },
    // Define the "phone" field with properties similar to "country".
    phone: {
        type: String,
        required: true,
    },
    // Define the "password" field to store user passwords.
    password: {
        type: String,
        required: true,
    },
    // Define the "isAdmin" field as a Boolean with a default value of false.
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    // Define additional schema options, such as enabling timestamps for createdAt and updatedAt.
    { timestamps: true }
);

// Create and export the Mongoose model named "User" based on the defined schema.
export default mongoose.model("User", UserSchema);