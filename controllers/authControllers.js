import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { loginUser, logoutUser, signupUser, subscribeUser } from "../services/authServices.js";

const signupController = async (req, res) => {
    const newUser = await signupUser(req.body);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};
const loginController = async (req, res) => {
    const { user, token } = await loginUser(req.body);

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const logoutController = async function (req, res) {
    const { id } = req.user;
    await logoutUser(id);

    res.json({
        message: "Logout successfully",
    });
};

const currentController = async function (req, res) {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    });
};

const subscriptionController = async (req, res) => {
    const user = await subscribeUser(req.user, req.body);

    res.json({
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

export default {
    signupController: ctrlWrapper(signupController),
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    currentController: ctrlWrapper(currentController),
    subscriptionController: ctrlWrapper(subscriptionController),
};
