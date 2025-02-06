import { Router } from "express";
import { chatBotCallBack } from "../controllers/chatbot.controller.js";

const router = Router();

router.post("/", chatBotCallBack )

export default router;