require('dotenv').config();

module.exports.location = {
  host: 'localhost',
  user: 'postgres', // process.env.user,
  password: '', // process.env.password,
  database: 'recipe'
};

module.exports.production = {
  client: 'pg',
  connection: process.env.DATABASE_URL + '?ssl=true'
};

module.exports.environment = 'development'; // 'production'
//Used in database/db.js to determine with part of knexfile.js to use
