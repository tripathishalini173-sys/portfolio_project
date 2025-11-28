import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { forgotPassword} from "../controllers/passwordContoller.js";


import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/forgot-password",forgotPassword);

router.put("/:id", updateUser);     
router.delete("/:id", deleteUser);   
router.get("/", getAllUsers);

export default router;
