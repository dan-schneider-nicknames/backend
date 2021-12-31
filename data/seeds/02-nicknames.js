
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('nicknames').del()
    .then(function () {
      // Inserts seed entries
      return knex('nicknames').insert([
        {nickname_id: -1, nickname: 'Beer Can Dan', user_id: -2},
        {nickname_id: -2, nickname: 'Danny Diapers', user_id: -2},
        {nickname_id: -3, nickname: '"Ass Man" Dan', user_id: -2},
        {nickname_id: -4, nickname: 'Danny Daycare', user_id: -1},
        {nickname_id: -5, nickname: '"Big Daddy" Dan', user_id: -1},
      ]);
    });
};
