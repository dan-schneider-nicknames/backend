const db = require("../../data/db-config");
const { likes } = require("../../data/tableNames");

const getLike = like => {
  return db(likes).where(like);
};

const removeLike = like => getLike(like).del()

const addLike = like => db(likes).returning("like_id").insert(like)

const likeNickname = like => {
  getLike(like)
    .then(([likedBefore]) => {
      return likedBefore ? removeLike(like) : addLike(like)
    });
};

module.exports = {
  likeNickname,
  getLike
};
