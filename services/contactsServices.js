import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  //Повертає масив контактів.
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  //Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const contactToReturn = contacts.splice(index, 1)[0];
  await saveDB(contacts);
  return contactToReturn;
}

async function addContact({ name, email, phone }) {
  //Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();
  const id = nanoid();
  contacts.push({ id, name, email, phone });
  await saveDB(contacts);

  return contacts[contacts.length - 1];
}

async function updateContactById(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...data };

  await saveDB(contacts);

  return contacts[index];
}

async function saveDB(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
