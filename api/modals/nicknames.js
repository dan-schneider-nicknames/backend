const db = require("../../data/db-config");
const { nicknames, likes } = require("../../data/tableNames");

const getUserNicknames = async (user_id) => {
  try {
    return await db(nicknames).where({ user_id });
  } catch (err) {
    throw err;
  }
};

const getNicknames = async () => {
  try {
    const call = await db(nicknames)
    return call;
  } catch (err) {
    throw err;
  }
};

const getNicknameLikes = async (nickname_id) => {
  try {
    const { length } = await db(likes).where({ nickname_id });
    return length;
  } catch (err) {
    throw err;
  }
};

const getNicknameById = async (nickname_id) => {
  try {
    const call = await db(nicknames).where({ nickname_id }).first();
    return call;
  } catch (err) {
    throw err;
  }
};

const addNickname = async (nickname) => {
  try {
    const [nickname_id] = await db(nicknames).insert(nickname);
    const newNick = await getNicknameById(nickname_id);
    return newNick;
  } catch (err) {
    throw err;
  }
};

const deleteNickname = async (nickname_id) => {
  try {
    const call = await db(nicknames).where({ nickname_id }).del();
    return call;
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
  getNicknames,
};
