
import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware.js"
import { validate } from "../middleware/validate.middleware.js";
import { chatSchema, locationSchema } from "../validators/auth.validator.js";
import { locationController } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.post("/location", authenticate, validate(locationSchema),locationController);

export default userRouter;