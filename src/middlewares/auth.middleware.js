// it will verify is user there or not 
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../modles/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header
            ("Authorization")?.replace("Bearer", "")

        if (!token) {
            throw new ApiError(401, "unAuthorised Access")
        }

        // yadi token hei to kya??
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            //Next_Video: TODO: Discuss About FrontEnd 
            throw new ApiError(401, "Invalid Access Token")
        }


        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, Error?.message || "Invalid Access Token ")
    }
})