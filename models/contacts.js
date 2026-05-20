const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const collection = () => mongodb.getDatabase().collection('contacts');

const findAll = () => collection().find().toArray();

const findById = (id) => collection().findOne({ _id: id });

const create = (contact) => collection().insertOne(contact);

const replaceById = (id, contact) => collection().replaceOne({ _id: id }, contact);

const deleteById = (id) => collection().deleteOne({ _id: id });

const parseId = (id) => new ObjectId(id);

module.exports = {
    findAll,
    findById,
    create,
    replaceById,
    deleteById,
    parseId,
};
