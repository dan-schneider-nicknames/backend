const db = require("../../data/db-config");
const { likes } = require("../../data/tableNames");

const getLike = like => {
  return db(likes).where(like);
};

const likeNickname = like => {
  getLike(like)
    .then(([likedBefore]) => {
      if (likedBefore) {
        return getLike(like).del();
      } else {
        return db(likes).returning("like_id").insert(like);
      }
  });
};

module.exports = {
  likeNickname,
  getLike
};
