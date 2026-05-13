const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
   const contacts = await mongodb.getDatabase().collection('contacts').find().toArray();
   res.setHeader('Content-Type', 'application/json');
   res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
    let contactId;
    try {
        contactId = new ObjectId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid contact id' });
    }
    const contact = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
};

module.exports = {
    getAll,
    getSingle,
};