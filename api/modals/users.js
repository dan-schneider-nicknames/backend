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

const addUser = async (user) => {
  try {
    const [user_id] = await db(users).insert(user);
    const newUser = await getUserById(user_id);
    return newUser;
  } catch (err) {
    throw err;
  }
};

const getUserBy = (user) => db(users).where(user).first();

const getUserByEmail = async (email) => {
  try {
    const user = await getUserBy({ email });
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByContext = async (user) => {
  try {
    if (
      user.includes("@") &&
      (user.includes(".com") || user.includes(".net") || user.includes(".org"))
    ) {
      const emailUser = await getUserByEmail(user);
      return emailUser;
    } else {
      const usernameUser = await getUserByUsername(user);
      return usernameUser;
    }
  } catch (err) {
    throw err;
  }
};

const getUserById = async (user_id) => {
  try {
    const call = await getUserBy({ user_id });
    return call;
  } catch (err) {
    throw err;
  }
};

const getUserByUsername = async (username) => {
  try {
    const call = await getUserBy({ username });
    return call;
  } catch (err) {
    throw err;
  }
};

const updateUserById = async (user_id, props) => {
  try {
    const id = await getUserBy({ user_id }).update(props)
    return id
  } catch(err) {
    throw err
  }
}

module.exports = {
  getUsers,
  addUser,
  getUserBy,
  getUserByContext,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUserById
};
