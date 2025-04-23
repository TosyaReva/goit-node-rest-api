import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";
import { emailRegexp } from "../../constants/auth.js";

export const User = sequelize.define("user", {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: emailRegexp,
        },
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ["starter", "pro", "business"],
        defaultValue: "starter",
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    avatarURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// User.sync({ force: true });
