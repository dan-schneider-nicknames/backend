
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          user_id: -1, 
          username: 'coolhatguy', 
          email: "fakeEmail@fake.com",
          password: "password" // to be replaced with hash later
        },
        {
          user_id: -2, 
          username: 'bradford', 
          email: "fakerEmail@fake.com",
          password: "password2" // to be replaced with hash later
        },
      ]);
    });
};
