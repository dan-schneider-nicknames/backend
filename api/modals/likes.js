const db = require("../../data/db-config");
const { likes } = require("../../data/tableNames");

const getLike = (like) => {
  return db(likes).where(like);
};

const likeNickname = (nickname_id, user_id) => {
  const like = { nickname_id, user_id };
  getLike(like).then(([likedBefore]) => {
    if (likedBefore) {
      return getLike(like).del();
    } else {
      return db(likes).insert(like);
    }
  });
};

module.exports = {
  likeNickname
};
