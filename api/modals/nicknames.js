const db = require("../../data/db-config");
const { nicknames, likes } = require("../../data/tableNames");

const getUserNicknames = async (user_id) => {
  try {
    return await db(nicknames).where({ user_id });
  } catch (err) {
    console.log(err);
  }
};

const getNicknames = async () => {
  try {
    await db(nicknames);
  } catch (err) {
    console.log(err);
  }
};

const getNicknameLikes = async (nickname_id) => {
  try {
    const { length } = await db(likes).where({ nickname_id });
    return length;
  } catch (err) {
    console.log(err);
  }
};

const getNicknameById = async (nickname_id) => {
  try {
    const call = await db(nicknames).where({ nickname_id }).first();
    return call;
  } catch (err) {
    console.log(err);
  }
};

const addNickname = async (nickname) => {
  try {
    const [nickname_id] = await db(nicknames).insert(nickname);
    const newNick = await getNicknameById(nickname_id);
    return newNick;
  } catch (err) {
    console.log(err);
  }
};

const deleteNickname = async (nickname_id) => {
  try {
    const call = await db(nicknames).where({ nickname_id }).del();
    return call;
  } catch (err) {
    console.log(err);
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
