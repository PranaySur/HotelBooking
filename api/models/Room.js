// Import the 'mongoose' library, which allows us to work with MongoDB.
import mongoose from "mongoose";

// Define a new Mongoose schema for the "Room" model.
const RoomSchema = new mongoose.Schema({
    // Define the "title" field with properties such as type and required.
    title: {
        type: String,
        required: true,
    },
    // Define the "price" field with properties similar to "title."
    price: {
        type: Number,
        required: true,
    },
    // Define the "maxPeople" field with properties similar to "title."
    maxPeople: {
        type: Number,
        required: true,
    },
    // Define the "desc" (description) field with properties similar to "title."
    desc: {
        type: String,
        required: true,
    },
    // Define the "roomNumbers" field as an array of objects.
    roomNumbers: [
        {
            number: Number,
            // Define the "unavailableDates" field within each object as an array of Dates.
            unavailableDates: {
                type: [Date],
            },
        }
    ],
},
    // Define additional schema options, such as enabling timestamps for createdAt and updatedAt.
    { timestamps: true }
);

// Create and export the Mongoose model named "Room" based on the defined schema.
export default mongoose.model("Room", RoomSchema);