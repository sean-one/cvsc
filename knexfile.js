// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/cvscDB.sqlite3',
      timezone: 'UTC',
      dateStrings: true
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/data/migrations"
    },
    seeds: {
      directory: __dirname + "/data/seeds"
    }
  },
  production: {
    client: "pg",
    // connection: {
    //   host: "localhost:5433",
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: "cscv_local_server"
    // },
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/data/migrations"
    },
    seeds: {
      directory: __dirname + "/data/seeds"
    }

  }

};
