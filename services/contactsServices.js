import Contact from "../db/models/Contacts.js";
import HttpError from "../helpers/HttpError.js";

async function listContacts(query, filters = {}) {
    return Contact.findAll({
        where: query,
        ...filters,
    });
}

async function getContact(query) {
    return Contact.findOne({
        where: query,
    });
}

async function removeContact(query) {
    const rowToReturn = await getContact(query);
    if (!rowToReturn) throw HttpError(400, "Contact not found")();

    await Contact.destroy({
        where: query,
    });

    return rowToReturn;
}

async function addContact(data) {
    return Contact.create(data);
}

async function updateContactById(query, data) {
    const contact = await getContact(query);
    if (!contact) return null;

    return contact.update(data, {
        returning: true,
    });
}

export { listContacts, getContact, removeContact, addContact, updateContactById };
