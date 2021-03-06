require('dotenv').config();

const DB_NAME = 'visualheaven';
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_URI = `${URI}/${DB_NAME}`;

module.exports.dbName = DB_NAME;
module.exports.db = DB_URI;