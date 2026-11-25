import jwt from "jsonwebtoken";
import { Owner } from "../models/ownerModel.js";

const ownerAuth = async (req, res, next) => {
    try {
        let token;
        if(req.cookies?.hotelBookingOwnerToken){
            token = req.cookies.hotelBookingOwnerToken;
        }
        if(!token){
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner = await Owner.findById(decodedToken.id).select("-password");
        req.owner = owner
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: 'Unauthorized'});
    }
}

export default ownerAuth;