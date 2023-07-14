import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateCart,
  deleteCart,
  comment
} from "../controllers/user.js";

const router = Router();

router.get("/user/profile", getUserProfile);
router.post("/user/comment", comment);
router.put("/user/update", updateUserProfile);
router.put("/cart", updateCart);
router.delete("/cart/:id", deleteCart);

export default router;