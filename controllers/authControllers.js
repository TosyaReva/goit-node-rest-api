import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { loginUser, logoutUser, signupUser, updateUser } from "../services/authServices.js";
import path from "node:path";
import fs from "node:fs/promises";

const avatarDir = path.resolve("public", "avatars");

const signupController = async (req, res) => {
    const newUser = await signupUser(req.body);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
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
            avatarURL: user.avatarURL,
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
    const user = await updateUser(req.user, req.body);

    res.json({
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        },
    });
};

const updateAvatarController = async (req, res) => {
    let avatar = null;
    if (req.file) {
        const { path: oldPath, filename } = req.file;
        const newPath = path.join(avatarDir, filename);
        await fs.rename(oldPath, newPath);
        avatar = path.join("avatars", filename);
    } else {
        throw HttpError(400, "An 'avatar' field is required");
    }

    const user = await updateUser(req.user, { avatarURL: avatar });

    res.json({
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        },
    });
};

export default {
    signupController: ctrlWrapper(signupController),
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    currentController: ctrlWrapper(currentController),
    subscriptionController: ctrlWrapper(subscriptionController),
    updateAvatarController: ctrlWrapper(updateAvatarController),
};
