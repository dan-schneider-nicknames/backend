const db = require("../../data/db-config");
const { nicknames, likes } = require("../../data/tableNames");

const getNicknames = () => db(nicknames).orderBy("nickname_id", "desc")

const getNicknamesBy = nickname => getNicknames().where(nickname)

const getUserNicknames = async user_id => {
  try {
    const userNicknames = await getNicknamesBy({ user_id });
    return userNicknames
  } catch (err) {
    throw err;
  }
};

const removeFoulNames = async ( string ) => {
  try{
     const bad = await getNicknamesBy({ nickname: string }).returning("nickname");
     console.log(bad)
     return bad;
  } catch (err){
    throw err;
  }
};

const getNicknameLikes = async nickname_id => {
  try {
    const { length } = await db(likes).where({ nickname_id });
    return length;
  } catch (err) {
    throw err;
  }
};

const getNicknameById = async nickname_id => {
  try {
    const call = await getNicknamesBy({ nickname_id }).first();
    return call;
  } catch (err) {
    throw err;
  }
};

const addNickname = async nickname => {
  try {
    const [nickname_id] = await db(nicknames)
      .returning("nickname_id")
      .insert(nickname);
    const newNick = await getNicknameById(nickname_id);
    return newNick;
  } catch (err) {
    throw err
  }
};

const deleteNickname = async nickname_id => {
  try {
    const removedNickname = await getNicknamesBy({ nickname_id }).del();
    return removedNickname;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserNicknames,
  getNicknameLikes,
  getNicknameById,
  addNickname,
  deleteNickname,
  removeFoulNames,
  getNicknames,
  getNicknamesBy
};
