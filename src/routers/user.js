import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";

import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/user/profile",authenticate, getUserProfile);
router.put("/user/update", authenticate,updateUserProfile);

export default router;