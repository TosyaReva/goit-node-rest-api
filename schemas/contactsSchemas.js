import Joi from "joi";

const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

export const createContactSchema = Joi.object({
    name: Joi.string().required().error(new Error("Field 'name' is required")),
    phone: Joi.string().regex(phoneRegex).error(new Error("Phone is required, has format '(###) ###-####' and should include only numbers, spaces, dashes and round brackets")).required(),
    email: Joi.string().email().required().error(new Error("Field 'email' is required and should have valid pattern")),
    favorite: Joi.boolean().error(new Error("Field 'favorite' is boolean or empty")),
});

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.string().regex(phoneRegex).messages({
        "any.only": "Phonehas format '(###) ###-####' and should include only numbers, spaces, dashes and round brackets",
    }),
    email: Joi.string().email().error(new Error("Field 'email' should have valid pattern")),
    favorite: Joi.boolean().error(new Error("Field 'favorite' is boolean or empty")),
});

export const updateFavorite = Joi.object({
    favorite: Joi.boolean().required().error(new Error("Field 'favorite' is required and should be boolean")),
});
