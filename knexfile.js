const configDB = require('./db_config.js').location;
const path = require('path');

require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: configDB,
    pool: {
      min: 0,
      max: 5
    }
    // seeds: {
    //   directory: path.join(__dirname, '/database/seeds')
    // }
  },

  staging: {
    client: 'pg',
    connection: configDB,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
