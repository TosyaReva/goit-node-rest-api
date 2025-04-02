import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const data = await listContacts();
  res.json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id);

  if (!data) throw HttpError(404, "Not found");

  res.json(data);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await removeContact(id);

  if (!data) throw HttpError(404, "Not found");

  res.json({
    message: "Delete successfully",
  });
};

const createContact = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = await updateContactById(id, req.body);

  if (!data) throw HttpError(404, "Not found");

  res.json(data);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
