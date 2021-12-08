const contactsPath = require('./db/contactPath');
const fs = require('fs/promises');
const {v4} = require("uuid");


const updateContacts = async(contacts)=> {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}


const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result){
        return null;
    }
    return result;
}


const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await updateContacts(newContacts);
    return contacts[idx];
}

    const addContact = async (data) => {
    const newContact = {id: v4(),...data};
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
    }




module.exports = {
listContacts,getContactById, removeContact,addContact
}