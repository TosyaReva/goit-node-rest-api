import Contact from "../db/models/Contacts.js";

async function listContacts() {
    return Contact.findAll();
}

async function getContactById(id) {
    return Contact.findByPk(id);
}

async function removeContact(id) {
    const rowToReturn = Contact.findByPk(id);
    if (!rowToReturn) throw new Error();

    await Contact.destroy({
        where: { id },
    });

    return rowToReturn;
}

async function addContact(data) {
    return Contact.create(data);
}

async function updateContactById(id, data) {
    const contact = await Contact.findByPk(id);
    if (!contact) return null;

    return contact.update(data, {
        returning: true,
    });
}

export { listContacts, getContactById, removeContact, addContact, updateContactById };
