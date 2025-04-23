import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { listContacts, getContact, removeContact, addContact, updateContactById } from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
    const { page, limit, favorite } = req.query;
    const { id: owner } = req.user;

    const query = { owner };
    if (typeof favorite !== "undefined") query.favorite = favorite; // true or false

    const filters = {};
    if (limit) {
        filters.limit = Number(limit);
        if (page) filters.offset = Number(page) * Number(limit);
    }

    const data = await listContacts(query, filters);
    res.json(data);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const data = await getContact({ id, owner });

    if (!data) throw HttpError(404, "Not found");

    res.json(data);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const data = await removeContact({ id, owner });

    if (!data) throw HttpError(404, "Not found");

    res.json(data);
};

const createContact = async (req, res) => {
    const { id: owner } = req.user;
    const data = await addContact({ ...req.body, owner });
    res.status(201).json(data);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const data = await updateContactById({ id, owner }, req.body);

    if (!data) throw HttpError(404, "Not found");

    res.json(data);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const data = await updateContactById({ id, owner }, req.body);

    if (!data) throw HttpError(404, "Not found");

    res.json(data);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};
