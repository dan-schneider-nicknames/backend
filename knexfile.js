require('dotenv').config()

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'sqlite3',
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
        filename: "./data/db3"
    },
  },
  testing: {
    ...sharedConfig,
    connection: {
        filename: "./data/db3"
    },
  },
  production: {
    ...sharedConfig,
    connection: {
        filename: "./data/db3"
    },
    pool: { min: 2, max: 10 },
  },
}