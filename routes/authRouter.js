import express from "express";
import authControllers from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import { authSignupSchema, subscriptionSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import uploadErrorHanlder from "../helpers/uploadErrorHanlder.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(authSignupSchema), authControllers.signupController);
authRouter.post("/login", isEmptyBody, validateBody(authSignupSchema), authControllers.loginController);
authRouter.post("/logout", authenticate, authControllers.logoutController);
authRouter.get("/current", authenticate, authControllers.currentController);
authRouter.patch("/subscription", authenticate, validateBody(subscriptionSchema), authControllers.subscriptionController);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), uploadErrorHanlder, authControllers.updateAvatarController);

export default authRouter;
