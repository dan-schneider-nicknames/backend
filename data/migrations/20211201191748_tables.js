const { nicknames, users, likes } = require("../tableNames")

exports.up = knex => {
  return knex.schema.createTable(users, table => {
    table.increments("user_id")
    table.string("username")
        .notNullable()
        .unique()
    table.string("email")
        .notNullable()
        .unique()
    table.string("password")
        .notNullable()
  }).createTable(nicknames, table => {
    table.increments("nickname_id")
    table.string("nickname")
        .notNullable()
        .unique()
    table.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable(users)
  }).createTable(likes, table => {
    table.increments("like_id")
    table.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable(users)
    table.integer("nickname_id")
        .unsigned()
        .notNullable()
        .references("nickname_id")
        .inTable(nicknames)
  })
};

exports.down = knex => {
  return knex.schema.dropTableIfExists(likes)
    .dropTableIfExists(nicknames)
    .dropTableIfExists(users)
};
