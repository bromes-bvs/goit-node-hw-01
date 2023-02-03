// const argv = require('yargs').argv;

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const { addContact, removeContact, getContactById, listContacts } = require('./contacts');
// console.log(argv);

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
