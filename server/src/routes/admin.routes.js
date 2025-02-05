import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/create-song", createSong );
router.delete("/delete-song/:id", deleteSong );

router.post("/create-album", createAlbum )
router.delete("/delete-album/:id", deleteAlbum )

export default router;