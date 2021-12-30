// Update with your config settings.
require("dotenv").config()

const { DATABASE_URL } = process.env

const pg = require("pg");

if (DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const shared = {
  migrations: {
    directory: "./data/migrations"
  },
  seeds: {
    directory: "./data/seeds"
  },
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10
  },
}

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: './data/sqlite3.db'
    },
    ...shared
  },
  staging: {
    client: "sqlite3",
    connection: {
      filename: './data/sqlite3.db'
    },
    ...shared
  },
  production: {
    ...shared,
    client: 'pg',
    connection: DATABASE_URL
  }
};
