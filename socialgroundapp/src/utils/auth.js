// import jwt
const jwt = require('jsonwebtoken');

// import db interactions module
const dbLib = require('./dbFunctions');

/**
 *  authenticates a user by decoding the JWT
 * @returns true iff the user is valid
 */
const authenticateUser = async (token, key) => {
  // check the params
  if (token === null || key === null || !key) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, key);
    // verify the user
    const user = await dbLib.getAUser(decoded.username);
    // check the user
    if (!user) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { authenticateUser };
