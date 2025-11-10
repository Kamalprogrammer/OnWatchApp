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
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
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
export default router;