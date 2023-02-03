const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

// Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, './db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    return console.table(JSON.parse(contactsList));
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');

    const searchContact = JSON.parse(contactsList).find(({ id }) => id === contactId.toString());
    if (!searchContact) {
      return console.log('Sorry there is no contact with this id');
    }
    // У вигляді гарної таблиці
    // console.table([searchContact]);

    return console.table(searchContact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const parsContacts = JSON.parse(contactsList);
    const contactIndex = parsContacts.findIndex(({ id }) => id === contactId.toString());
    // console.log(contactIndex);
    if (contactIndex === -1) {
      return console.log('Sorry there is no contact with this id');
    }

    const deleteContact = parsContacts.splice(contactIndex, 1);

    // console.table(parsContacts);
    // Альтернативний варіант
    // const updateList = parsContacts.filter(contact => contact.id !== contactId),

    await fs.writeFile(contactsPath, JSON.stringify(parsContacts, null, '\t'));
    return console.table(deleteContact);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: nanoid(4),
      name,
      email,
      phone,
    };
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsList);
    contacts.push(newContact);

    console.table(contacts);
    return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
