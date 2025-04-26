import bcrypt from "bcrypt";
import gravatar from "gravatar";

import { User } from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/generateToken.js";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";
import { createEmailTemplate } from "../helpers/emailTemplate.js";

const { APP_DOMAIN } = process.env;

const createVerifyEmail = (email, verificationCode) => ({
    to: email,
    subject: "Verify email",
    html: createEmailTemplate(`${APP_DOMAIN}/api/auth/verify/${verificationCode}`),
});

export async function signupUser(data) {
    const { email, password } = data;
    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (user) throw HttpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 12);

    const avatarURL = gravatar.url(email, { s: 100, protocol: "https" });

    const verificationToken = nanoid();
    const newUser = User.create({ ...data, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = createVerifyEmail(email, verificationToken);
    await sendEmail(verifyEmail);

    return newUser;
}

export async function loginUser(data) {
    const { email, password } = data;
    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (!user) throw HttpError(401, "Email or password is wrong");
    if (!user.verify) throw HttpError(401, "Email was not verified");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {
        email,
    };

    const token = generateToken(payload);

    await user.update({ token });

    return { user, token };
}

export const findUser = (query) =>
    User.findOne({
        where: query,
    });

export const logoutUser = async (id) => {
    const user = await findUser({ id });

    if (!user || !user.token) {
        throw HttpError(404, "User not found");
    }

    await user.update({ token: null });
};

export const updateUser = async (user, body) => {
    return user.update(body, {
        returning: true,
    });
};

export const verifyUser = async (verificationToken) => {
    const user = await findUser({ verificationToken });

    if (!user) {
        throw HttpError(404, "User not found");
    }

    await user.update({ verificationToken: null, verify: true });
};

export const resendVerifyEmail = async (email) => {
    const user = await findUser({ email });

    if (!user) {
        throw HttpError(404, "User not found");
    }

    if (user.verify) {
        throw HttpError(401, "Verification has already been passed");
    }

    const verifyEmail = createVerifyEmail(email, user.verificationToken);

    await sendEmail(verifyEmail);
};
