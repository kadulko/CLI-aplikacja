const fs = require("node:fs").promises;
const path = require("node:path");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

const fetchContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const pushContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (err) {
    console.log(err.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await fetchContacts();
    console.table(contacts);
    return;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fetchContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      console.log(`No contact with given id found!`.brightRed);
      return;
    }
    console.log(contact);
    return;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fetchContacts();
    if (contacts.findIndex((contact) => contact.id === contactId) === -1) {
      console.log(`No contact with given id found!`.brightRed);
      return;
    }
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await pushContacts(newContacts);
    console.log("Contact removed successfully!".green);
    return;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fetchContacts();
    const newContact = { id: `${contacts.length + 1}`, name, email, phone };
    contacts.push(newContact);
    await pushContacts(contacts);
    console.log(
      `Contact ${JSON.stringify(newContact)} added successfully!`.green
    );
    return;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
