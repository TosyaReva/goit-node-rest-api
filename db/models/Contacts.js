import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";
import { emailRegexp } from "../../constants/auth.js";

const Contact = sequelize.define("contact", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "name must be exist",
            },
            notEmpty: {
                msg: "name cannot be empty",
            },
        },
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "email must be exist",
            },
            notEmpty: {
                msg: "email cannot be empty",
            },
            is: emailRegexp,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "phone must be exist",
            },
            notEmpty: {
                msg: "phone cannot be empty",
            },
        },
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: "The value for 'favorite' must be either true or false",
            },
        },
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Contact.sync({ force: true });

export default Contact;
