// inclusions
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

// Express server port definition
const port = process.env.PORT || 3000;

// Session secret key
const key = process.env.SESSION_KEY || 'OnceUponATimeInDisneylandIMetMickeyMouse';

// Database variables
const dbProd   = process.env.DB_URI;
const dbName   = process.env.DB_NAME || 'PAMM';
const dbPath   = process.env.DB_PATH || 'mongodb://localhost:27017/';

module.exports = {port, key, dbName, dbPath, dbProd, environment}