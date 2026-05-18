/**
 * One-time import: reads temples.json and inserts into project01.temples
 * Run: node scripts/seed-temples.js
 */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const dns = require('dns');
const { MongoClient } = require('mongodb');
const { EJSON } = require('bson');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const jsonPath = path.join(__dirname, '..', 'temples.json');

async function seed() {
    if (!process.env.MONGODB_URL) {
        console.error('MONGODB_URL is missing from .env');
        process.exit(1);
    }

    const raw = fs.readFileSync(jsonPath, 'utf8');
    const temples = EJSON.parse(raw);

    if (!Array.isArray(temples) || temples.length === 0) {
        console.error('temples.json must be a non-empty array');
        process.exit(1);
    }

    const client = await MongoClient.connect(process.env.MONGODB_URL, {
        family: 4,
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    });

    try {
        const db = client.db('project01');
        const collection = db.collection('temples');
        const existing = await collection.countDocuments();

        if (existing > 0) {
            console.log(`temples already has ${existing} documents — skipping import.`);
            console.log('To re-import, delete the collection in Atlas first, then run this again.');
            return;
        }

        const result = await collection.insertMany(temples);
        console.log(`Imported ${result.insertedCount} temples into project01.temples`);
    } finally {
        await client.close();
    }
}

seed().catch((err) => {
    console.error('Import failed:', err.message);
    process.exit(1);
});
