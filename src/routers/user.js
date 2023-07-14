import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateCart,
  deleteCart,
  comment
} from "../controllers/user.js";

import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/user/profile",authenticate, getUserProfile);
router.post("/user/comment", authenticate,comment);
router.put("/user/update", authenticate,updateUserProfile);
router.put("/cart", authenticate,updateCart);
router.delete("/cart/:id",authenticate, deleteCart);

export default router;