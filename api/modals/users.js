const db = require("../../data/db-config");
const { users } = require("../../data/tableNames");

const getUsers = async () => {
  try {
    const call = await db(users);
    return call;
  } catch (err) {
    throw err;
  }
};

const addUser = async user => {
  try {
    const [user_id] = await db(users).insert(user);
    const newUser = await getUserById(user_id);
    return newUser;
  } catch (err) {
    throw err;
  }
};

const getUserBy = user => db(users).where(user).first()


const getUserById = async user_id => {
  try {
    const call = await getUserBy({ user_id });
    return call;
  } catch (err) {
    throw err;
  }
};

const getUserByUsername = async username => {
  try {
    const call = await getUserBy({ username });
    return call;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  getUserByUsername,
};
