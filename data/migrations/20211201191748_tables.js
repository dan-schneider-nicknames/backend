
const NICKNAMES = "nicknames"
const USERS = "users"
const LIKES = "likes"

exports.up = knex => {
  return knex.schema.createTable(USERS, table => {
    table.increments("user_id")
    table.string("username")
        .notNullable()
        .unique()
    table.string("email")
        .notNullable()
        .unique()
    table.string("password")
        .notNullable()
        .unique()
  }).createTable(NICKNAMES, table => {
    table.increments("nickname_id")
    table.string("nickname")
        .notNullable()
        .unique()
    table.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable(USERS)
  }).createTable(LIKES, table => {
    table.increments("like_id")
    table.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable(USERS)
    table.integer("nickname_id")
        .unsigned()
        .notNullable()
        .references("nickname_id")
        .inTable(NICKNAMES)
  })
};

exports.down = knex => {
  return knex.schema.dropTableIfExists(LIKES)
    .dropTableIfExists(NICKNAMES)
    .dropTableIfExists(USERS)
};
