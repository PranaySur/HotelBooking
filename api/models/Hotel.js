// Import the 'mongoose' library, which allows us to work with MongoDB.
import mongoose from "mongoose";

// Define a new Mongoose schema for the "Hotel" model.
const HotelSchema = new mongoose.Schema({
    // Define the "name" field with properties such as type and required.
    name: {
        type: String,
        required: true,
    },
    // Define the "type" field with properties similar to "name."
    type: {
        type: String,
        required: true,
    },
    // Define the "city" field with properties similar to "name."
    city: {
        type: String,
        required: true,
    },
    // Define the "address" field with properties similar to "name."
    address: {
        type: String,
        required: true,
    },
    // Define the "distance" field with properties similar to "name."
    distance: {
        type: String,
        required: true,
    },
    // Define the "photos" field as an array of strings to store photo URLs.
    photos: {
        type: [String],
    },
    // Define the "title" field with properties similar to "name."
    title: {
        type: String,
        required: true,
    },
    // Define the "desc" (description) field with properties similar to "name."
    desc: {
        type: String,
        required: true,
    },
    // Define the "rating" field as a number with a minimum value of 0 and a maximum value of 5.
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    // Define the "rooms" field as an array of strings to store room details.
    rooms: {
        type: [String],
    },
    // Define the "cheapestPrice" field as a number, which is required.
    cheapestPrice: {
        type: Number,
        required: true,
    },
    // Define the "featured" field as a boolean with a default value of false.
    featured: {
        type: Boolean,
        default: false,
    },
});

// Create and export the Mongoose model named "Hotel" based on the defined schema.
export default mongoose.model("Hotel", HotelSchema);