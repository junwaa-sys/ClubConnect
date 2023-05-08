const { join } = require('node:path')

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: join(__dirname, 'dev.sqlite3'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },
  // 'Pacific/Auckland'
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: join(__dirname, 'migrations'),
    },
    seeds: {
      directory: join(__dirname, 'seeds'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  production: {
    // client: 'sqlite3',
    // useNullAsDefault: true,
    // connection: {
    //   filename: join(__dirname, 'dev.sqlite3'),
    // },
    // pool: {
    //   afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    // },
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    // client: 'sqlite3',
    // connection: {
    //   filename: '/app/storage/dev.sqlite3',
    // },
    // useNullAsDefault: true,
  },
}
