const contactsModel = require('../models/contacts');

const contactFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

const getContactPayload = (body) => ({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    favoriteColor: body.favoriteColor,
    birthday: body.birthday,
});

const hasAllRequiredFields = (body) => contactFields.every((field) => body[field]);

const getAll = async (req, res) => {
    try {
        const contacts = await contactsModel.findAll();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while getting contacts' });
    }
};

const getSingle = async (req, res) => {
    let contactId;
    try {
        contactId = contactsModel.parseId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid contact id' });
    }

    try {
        const contact = await contactsModel.findById(contactId);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while getting the contact' });
    }
};

const createContact = async (req, res) => {
    if (!hasAllRequiredFields(req.body)) {
        return res.status(400).json({ error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' });
    }

    const contact = getContactPayload(req.body);
    try {
        const response = await contactsModel.create(contact);
        if (response.acknowledged) {
            return res.status(201).json({ id: response.insertedId });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the contact' });
    }

    return res.status(500).json({ error: 'An error occurred while creating the contact' });
};

const updateContact = async (req, res) => {
    let contactId;
    try {
        contactId = contactsModel.parseId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid contact id' });
    }

    if (!hasAllRequiredFields(req.body)) {
        return res.status(400).json({ error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' });
    }

    const contact = getContactPayload(req.body);
    try {
        const response = await contactsModel.replaceById(contactId, contact);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        if (response.modifiedCount > 0 || response.acknowledged) {
            return res.status(204).send();
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the contact' });
    }

    return res.status(500).json({ error: 'An error occurred while updating the contact' });
};

const deleteContact = async (req, res) => {
    let contactId;
    try {
        contactId = contactsModel.parseId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid contact id' });
    }

    try {
        const response = await contactsModel.deleteById(contactId);
        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the contact' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
};