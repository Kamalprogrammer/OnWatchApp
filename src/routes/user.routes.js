// import express from "express";
// import { Router } from "express";
// import { registerUser } from '../controllers/user.controller.js'
// const router = Router()

// router.route("/register").post(registerUser);
// // router.route("/login").post(registerUser)

// console.log("✅ user.routes.js loaded");

// export default router


// routes/user.routes.js
// import { Router } from "express";
import express from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    // getUserChennalProfile,
    getWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updataAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            // front end pr isi naam ka elementbanega 
            maxCount: 1
        },
        {
            name: "coverImg",
            maxCount: 1
        }
    ]),
    registerUser);
router.route("/login").post(loginUser)

// secured Routes After Middleware 
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/currect-user").post(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updataAccountDetails)


router
    .route("/avatar")
    .patch(verifyJWT, upload
        .single("avatar"), updateUserAvatar)

router
    .route("/cover-image")
    .patch(verifyJWT, upload
        .single("coverImage"), updateUserCoverImage)

// when we get data from params
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

router.route("/history").get(verifyJWT, getWatchHistory)



export default router;