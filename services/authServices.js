import bcrypt from "bcrypt";

import { User } from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/generateToken.js";

export async function signupUser(data) {
    const { email, password } = data;
    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (user) throw HttpError(409, "Email in use");

    const hashPassword = await bcrypt.hash(password, 12);

    return User.create({ ...data, password: hashPassword });
}

export async function loginUser(data) {
    const { email, password } = data;
    const user = await User.findOne({
        where: {
            email,
        },
    });

    if (!user) throw HttpError(401, "Email or password is wrong");

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

export const subscribeUser = async (user, body) => {
    return user.update(body, {
        returning: true,
    });
};
