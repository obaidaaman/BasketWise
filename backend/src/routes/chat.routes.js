import { Router } from "express"
import { chatbot } from "../controllers/chat.controller.js"


const chatRouter = Router();

chatRouter.post("/chat", chatbot);

export default chatRouter;