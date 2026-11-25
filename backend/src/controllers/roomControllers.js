import uploadOnCloudinary from "../utils/cloudinary.js";
import { Hotel } from "../models/hotelModel.js";
import { Room } from "./../models/roomModel.js";
import { v2 as cloudinary } from "cloudinary";

// owner can add room
const addRoom = async (req, res) => {
    try {
        const { hotelId, roomNumber, roomType, pricePerNight, capacity, description, amenities } = req.body;
        if(!hotelId || !roomNumber || !roomType || !pricePerNight || !capacity || !description){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        if(hotel.ownerId.toString() !== req.owner._id.toString()){
            return res.status(403).json({ success: false, message: "You are not authorized to add room to this hotel."});
        }

        let parsedAmenities = [];
        try {
            parsedAmenities = amenities ? JSON.parse(amenities) : [];
        } catch (error) {
            return res.status(400).json({ success: false, message: "Invalid amenities format" });
        }

        if(!Array.isArray(parsedAmenities)){
            return res.status(400).json({ success: false, message: "Amenities should be an array" });
        }

        const image1 = req.files?.image1?.[0]?.path;
        const image2 = req.files?.image2?.[0]?.path;
        const image3 = req.files?.image3?.[0]?.path;
        const image4 = req.files?.image4?.[0]?.path;

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);
        if(images.length < 2){
            return res.status(400).json({ success: false, message: "At least two image are required" });
        }

        const imagesPath = await Promise.all(images.map((image) => uploadOnCloudinary(image)));
        if (imagesPath.some(image => !image)) {
            return res.status(500).json({ success: false, message: "Failed to upload one or more images."});
        }

        const room = await Room.create({
            hotelId,
            ownerId: req.owner._id,
            roomNumber,
            roomType,
            pricePerNight,
            capacity,
            images: imagesPath.map((image) => image.secure_url),
            publicIds: imagesPath.map((image) => image.public_id),
            description,
            amenities: parsedAmenities
        });

        return res.status(201).json({ success: true, message: "Room added successfully", room});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// user can see all rooms
const allRooms = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;

        const roomType = req.query.roomType || "";
        const roomCapacity = req.query.roomCapacity || 0;
        const roomPrice = req.query.roomPrice || 0;

        if (page < 1) page = 1;
        if (limit < 1) limit = 1;

        const skip = (page - 1) * limit;

        const filter = {status: true};

        if (roomType) filter.roomType = { $regex: roomType, $options: "i" };
        if (roomCapacity) filter.capacity = { $gte: roomCapacity };
        if (roomPrice) filter.pricePerNight = { $lte: roomPrice };

        const rooms = await Room.find(filter).populate("hotelId").skip(skip).limit(limit);
        const allRooms = await Room.find({ status: true }).populate("hotelId");
        
        const totalRooms = await Room.countDocuments(filter);
        const totalPages = Math.ceil(totalRooms / limit);

        return res.status(200).json({ success: true, rooms, allRooms, totalRooms, totalPages, currentPage: page });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owner can see all rooms
const ownerAllRooms = async (req,res) => {
    try {
        const id = req.owner._id; // owner id
        // const hotels = await Hotel.find({ownerId: id});
        // const rooms = await Room.find({ hotelId: { $in: hotels.map((hotel) => hotel._id) } }).populate("hotelId");
        const rooms = await Room.find({ ownerId: id }).populate("hotelId");
        return res.status(200).json({ success: true, rooms });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owner can delete room
const deleteRoom = async (req, res) => {
    try {
        const id = req.params.id;
        const room = await Room.findById(id);
        if(!room){
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        if(room.ownerId.toString() !== req.owner._id.toString()){
            return res.status(403).json({ success: false, message: "You are not authorized to delete this room."});
        }

        await Promise.all(room.publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)));
        // await Room.findByIdAndDelete(id);
        await room.deleteOne(); // Use deleteOne() on the document instance, This avoids another database lookup.

        return res.status(200).json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owner can update the room status
const updateRoomStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const room = await Room.findById(id);
        if(!room){
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        if(room.ownerId.toString() !== req.owner._id.toString()){
            return res.status(403).json({ success: false, message: "You are not authorized to update this room."});
        }

        room.status = !room.status;
        await room.save();
        
        return res.status(200).json({ success: true, message: "Room status updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// user can see all rooms of a hotel when user clicks on a hotel
const hotelRooms = async (req, res) => {
    try {
        const id = req.params.id;
        const rooms = await Room.find({
            hotelId: id,
            status: true
        });
        return res.status(200).json({ success: true, rooms});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    addRoom,
    allRooms,
    ownerAllRooms,
    deleteRoom,
    updateRoomStatus,
    hotelRooms
}