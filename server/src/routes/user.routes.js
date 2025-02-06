import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { gatAllUsers, getMessages } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, gatAllUsers)
router.get("/messages/:userId", protectRoute, getMessages);

export default router;