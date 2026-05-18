const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const temples = await mongodb.getDatabase().collection('temples').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(temples);
};

const getSingle = async (req, res) => {
    let templeId;
    try {
        templeId = new ObjectId(req.params.id);
    } catch {
        return res.status(400).json({ error: 'Invalid temple id' });
    }
    const temple = await mongodb.getDatabase().collection('temples').findOne({ _id: templeId });
    if (!temple) {
        return res.status(404).json({ error: 'Temple not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(temple);
};

module.exports = {
    getAll,
    getSingle,
};
