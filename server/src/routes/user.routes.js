import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { gatAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, gatAllUsers)

export default router;