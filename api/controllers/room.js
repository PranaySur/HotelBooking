// Import the "Room" and "Hotel" models from their respective files.
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// Import the "createError" function for error handling.
import { createError } from "../utils/error.js";

// Function for creating a new room associated with a hotel.
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        // Save the new room to the database.
        const savedRoom = await newRoom.save();

        try {
            // Add the room's ID to the 'rooms' array of the associated hotel.
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            next(err);
        }

        // Respond with a 200 OK status and the saved room data.
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

// Function for updating an existing room based on its ID.
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        // Respond with a 200 OK status and the updated room data.
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

// Function for updating the availability of a room based on its ID.
export const updateRoomAvailability = async (req, res, next) => {
    try {
        // Update the unavailableDates array of a room with the provided dates.
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates,
                },
            }
        );

        // Respond with a 200 OK status and a message indicating successful update.
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

// Function for deleting a room based on its ID and its associated hotel.
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        // Delete the room by its ID.
        await Room.findByIdAndDelete(req.params.id);

        try {
            // Remove the room's ID from the 'rooms' array of the associated hotel.
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err);
        }

        // Respond with a 200 OK status and a message indicating successful deletion.
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};

// Function for retrieving a room by its ID.
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        // Respond with a 200 OK status and the room data.
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

// Function for retrieving a list of all rooms.
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        // Respond with a 200 OK status and the list of rooms.
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};