import { Router } from "express"
import { chatbotController, getChatHistory } from "../controllers/chat.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { validate } from "../middleware/validate.middleware.js";
import { chatSchema } from "../validators/auth.validator.js";


const chatRouter = Router();

chatRouter.post("/chat", authenticate, validate(chatSchema), chatbotController);
chatRouter.get("/chat", authenticate, getChatHistory);

export default chatRouter;