const dotenv = require('dotenv');
dotenv.config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL, {
            family: 4,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        })
        .then((client) => {
            database = client.db('project01');
            callback(null, database);
        })
        .catch((err) => {
            callback(err, null);
        });
};

const getDatabase = () => {
    if (!database) {
         throw Error('Db not initialized!');
      }
      return database;
};

module.exports = {
    initDb,
    getDatabase,
};
