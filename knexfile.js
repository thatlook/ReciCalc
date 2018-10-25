const configDB = require('./db_config.js').location;

module.exports = {

  development: {
    client: 'pg',
    connection: configDB,
    pool: {
      min:0,
      max:5
    }
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
    connection: configDB,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
