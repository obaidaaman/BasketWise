
import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware.js"
import { validate } from "../middleware/validate.middleware.js";
import { locationSchema } from "../validators/auth.validator.js";
import { locationController, getLocationController } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.post("/location", authenticate, validate(locationSchema), locationController);
userRouter.get("/location", authenticate, getLocationController);
export default userRouter;