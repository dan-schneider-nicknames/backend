
exports.seed = function(knex) {
  return knex('likes').del()
    .then(function () {
      return knex('likes').insert([
        {like_id: 1, user_id: 1, nickname_id: 1},
        {like_id: 2, user_id: 1, nickname_id: 2},
        {like_id: 3, user_id: 1, nickname_id: 3},
        {like_id: 4, user_id: 2, nickname_id: 4},
        {like_id: 5, user_id: 2, nickname_id: 5},
      ]);
    });
};
