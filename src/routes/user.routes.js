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
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;