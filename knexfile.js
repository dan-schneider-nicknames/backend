// Update with your config settings.
const shared = {
  client: 'sqlite3',
  connection: {
    filename: './data/sqlite3.db'
  },
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
    ...shared
  },
  staging: {
    ...shared
  },
  production: {
    ...shared
  }
};
