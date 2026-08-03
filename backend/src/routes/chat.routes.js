import { Router } from "express"
import { chatbotController } from "../controllers/chat.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"


const chatRouter = Router();

chatRouter.post("/chat", authenticate, chatbotController);

export default chatRouter;