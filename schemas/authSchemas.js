import Joi from "joi";
import { emailRegexp } from "../constants/auth.js";

export const authSignupSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().error(new Error("Field 'email' is required and should have valid pattern")),
    password: Joi.string().min(6).required().error(new Error("Field 'password' is required and should have length at least 6")),
});

export const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required().error(new Error("Field 'subscription' is required and should be 'starter', 'pro' or 'business'")),
});
