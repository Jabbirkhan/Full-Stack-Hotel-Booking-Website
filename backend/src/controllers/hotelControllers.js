import uploadOnCloudinary from "./../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { Hotel } from "./../models/hotelModel.js";

// owner can create hotel
const createHotel = async (req, res) => {
    try {
        const { name, description, email, phone, address, city, country, amenities } = req.body;
        if (!name || !description || !email || !phone || !address || !city || !country) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        let parsedAmenities = [];
        try {
            parsedAmenities = amenities ? JSON.parse(amenities) : [];
        } catch {
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
        if (images.length < 2) {
            return res.status(400).json({ success: false, message: "At least two image is required" });
        }
        const imagesPath = await Promise.all(images.map((image) => uploadOnCloudinary(image)));
        if (imagesPath.some(image => !image)) {
            return res.status(500).json({ success: false, message: "Failed to upload one or more images."});
        }

        const hotel = await Hotel.create({
            ownerId: req.owner._id,
            name,
            description,
            email,
            phone,
            address,
            city,
            country,
            images: imagesPath.map((image) => image.secure_url),
            publicIds: imagesPath.map((image) => image.public_id),
            amenities: parsedAmenities,
        });

        return res.status(201).json({ success: true, message: "Hotel created successfully", hotel });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// user can see all hotels
const allHotels = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;

        const hotelName = req.query.hotelName || "";
        const hotelLocation = req.query.hotelLocation || "";
        const amenity = req.query.amenity || "";

        if (page < 1) page = 1;
        if (limit < 1) limit = 3;

        const skip = (page - 1) * limit;

        const filter = {status: true};
        if (hotelName) filter.name = { $regex: hotelName, $options: "i" };
        if (hotelLocation) filter.city = { $regex: hotelLocation, $options: "i" };
        if (amenity) filter.amenities = { $regex: amenity, $options: "i" };
        
        const hotels = await Hotel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const allHotels = await Hotel.find({ status: true }).limit(10);

        const totalHotels = await Hotel.countDocuments(filter);
        const totalPages = Math.ceil(totalHotels / limit);

        return res.status(200).json({ success: true, hotels, allHotels, totalHotels, totalPages, currentPage: page });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owners all hotels
const ownerAllHotels = async (req, res) => {
    try {
        const id = req.owner._id;
        const hotels = await Hotel.find({ ownerId: id });
        return res.status(200).json({ success: true, hotels });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owner can delete hotel
const deleteHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }
        
        if (hotel.ownerId.toString() !== req.owner._id.toString()) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this hotel."});
        }

        // delete images from cloudinary
        await Promise.all(hotel.publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)));
        // await Hotel.findByIdAndDelete(id);
        await hotel.deleteOne(); // Use deleteOne() on the document instance, This avoids another database lookup.

        return res.status(200).json({ success: true, message: "Hotel deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owner can update hotel status
const updateHotelStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        if (hotel.ownerId.toString() !== req.owner._id.toString()) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this hotel's status."});
        }

        hotel.status = !hotel.status;
        await hotel.save();

        return res.status(200).json({ success: true, message: "Hotel status updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    createHotel,
    allHotels,
    ownerAllHotels,
    deleteHotel,
    updateHotelStatus
}