import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavorite } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactsControllers.createContact);

contactsRouter.put("/:id", isEmptyBody, validateBody(updateContactSchema), contactsControllers.updateContact);

contactsRouter.patch("/:id/favorite", isEmptyBody, validateBody(updateFavorite), contactsControllers.updateStatusContact);

export default contactsRouter;
