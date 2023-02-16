/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
// "start": "node dbFunctions.js",   -- input in package.json

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import objectID
const { ObjectId } = require('mongodb');

const dbInfo = require('./key');

// mongodb server URL - input db name
const dbURL = `mongodb+srv://${dbInfo.dbAdmin}:${dbInfo.dbPassword}@sgcluster0.euaseyl.mongodb.net/${dbInfo.dbName}?retryWrites=true&w=majority`;

/**
 * MongoDB database connection
 * It will be exported so we can close the connection
 * after running our tests
 */
let MongoConnection;

// connection to the d b
const connect = async () => {
  // always use try/catch to handle any exceptions
  try {
    // we return the entire connection, not just the DB
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ));
    // const con = (await MongoClient.connect(
    //   dbURL,
    //   { useNewUrlParser: true, useUnifiedTopology: true },
    // )).db();
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    return MongoConnection;
  } catch (err) {
    console.log(err.message);
  }
  return null;
};
/**
 *
 * @returns the database attached to this MongoDB connection
 */
const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

/**
 * Close the MongoDB connection
 */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

/**
 * REGISTRATION
 */
// CREATE a new user
// takes a db connector and user object
// and add the user to the DB
const addUser = async (newUser) => {
  // get the db
  const db = await getDB();
  db.collection('users').insertOne(
    newUser,
    (err, result) => {
      if (err) {
        console.log(`error: ${err.message}`);
      }
      // print id of user
      // console.log(`New user created with id: ${result.insertedId}`);
      return result.insertedId;
    },
  );
};

// READ all users
const getAllUsers = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').find({}).toArray();
    // print the results
    // console.log(`Users: ${JSON.stringify(result)}`);
    // console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// READ a user given their ID
const getAUser = async (userID) => {
  try {
    // get the db
    console.log('userID is', typeof userID);
    const db = await getDB();
    // const trimmedUserID = userID.substring(1, userID.length - 1);
    // console.log(trimmedUserID);
    const result = await db.collection('users').findOne({ _id: ObjectId(userID) });
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
    console.log('mongoDB getUser complete');
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const getUserByEmail = async (userEmail) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ email: userEmail });
    // console.log(`User at line 120 of dbFunctions.js: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

/**
 * UPDATE USER INFORMATION
 */
const updateUserPassword = async (userID, newPassword) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(userID) },
      { $set: { password: newPassword } },
    );
    // print the results
    // console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const setCurrentUser = async (currUser) => {
  // get the db
  const db = await getDB();
  // changed currentUser to currentUserNew
  db.collection('currentUserNew').insertOne(
    currUser,
    (err, result) => {
      if (err) {
        console.log(`error: ${err.message}`);
      }
      // print id of user
      // console.log(`New user created with id: ${result.insertedId}`);
      return result.insertedId;
    },
  );
};
// jwt token
// store userid in the local storage when logged in
// when clicked on login button, backend returns a user id
// store the id in local storage
// redirect the user to the home page using the userid in the local storage
const getCurrentUser = async () => {
  try {
    // get the db
    const db = await getDB(); // 121722
    const result = await db.collection('currentUserNew').findOne({});
    // print the results
    // console.log(`Current user: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const deleteCurrentUser = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('currentUserNew').remove({});
    // print the results
    // console.log(`Current user: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const deleteUser = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').deleteOne(
      { _id: ObjectId(userID) },
    );
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

/**
 * This function adds 1 comment at a time to db only!
 * @returns the result's id
 */
const addCommentToDB = async (newComment) => {
  const db = await getDB();
  db.collection('comments').insertOne(
    newComment,
    (err, result) => {
      if (err) {
        console.log(`error: ${err.message}`);
      }
      console.log(`New comment created with id: ${newComment._id}`);
      return result._id;
    },
  );
};

/**
 * This function add a new comment to the destinated post
 * @returns
 */
const addCommentToPost = async (commentId, postId) => {
  try {
    const db = await getDB();
    const result = db.collection('posts').updateOne(
      { _id: ObjectId(postId) },
      // { _id: postId },
      { $push: { comments: commentId } },
    );
    // console.log(`Post: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// READ all comments
const getAllComments = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('comments').find({}).toArray();
    // print the results
    // console.log(`Comments: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// READ a comment given its ID
const getAComment = async (commentId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('comments').findOne({ _id: ObjectId(commentId) });
    // print the results
    // console.log(`Comments: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

/**
 * Posts Function
 */
const getAllPosts = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').find({}).toArray();
    // print the results
    // console.log(`Posts: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// READ a post given its ID
const getAPost = async (postId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').findOne({ _id: ObjectId(postId) });
    // print the results
    // console.log(`Comments: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const addPostToDB = async (newPost) => {
  const db = await getDB();
  db.collection('posts').insertOne(
    newPost,
    (err, result) => {
      if (err) {
        console.log(`error: ${err.message}`);
      }
      console.log(`New post created with id: ${result.insertedId}`);
      return result.insertedId;
    },
  );
};

const deleteFollowee = async (followeeId, followerId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('currentUserNew').updateOne(
      {},
      { $pull: { following: ObjectId(followeeId) } },
    );
    // print the results
    console.log(`Followee deleted: ${JSON.stringify(result)}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const deleteFollower = async (followeeId, followerId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(followeeId) },
      { $pull: { follower: ObjectId(followerId) } },
    );
    // print the results
    console.log(`Follower deleted: ${JSON.stringify(result)}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getFollowers = async (userID) => {
  try {
    const db = await getDB();
    const result = await db.collection('currentUser').findOne({ }, { projection: { follower: 1 } });
    // print the results
    // console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const getFollowing = async (userID) => {
  try {
    const db = await getDB();
    const result = await db.collection('currentUserNew').findOne({ }, { projection: { following: 1 } });
    // print the results
    // console.log(`followinglist: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const addFollower = async (followeeId, followerId) => {
  try {
    const db = await getDB();
    const result = db.collection('users').updateOne(
      { _id: ObjectId(followeeId) },
      { $push: { follower: ObjectId(followerId) } },
    );
    // print id of user
    // console.log(`New follower added: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const addFollowee = async (followeeId) => {
  try {
    const db = await getDB();
    console.log(`New followeeId: ${JSON.stringify(followeeId)}`);
    const result = await db.collection('currentUserNew').updateOne(
      { },
      { $push: { following: ObjectId(followeeId) } },
    );
    // print id of user
    // console.log(`New followee added: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};
// find an on hold user account given their ID
const setAccountOnHold = async (userID) => {
  // get the db
  const db = await getDB();
  db.collection('hold').insertOne(
    { _id: ObjectId(userID) },
    (err, result) => {
      if (err) {
        console.log(`error: ${err.message}`);
      }
      // print id of user
      // console.log(`New user created with id: ${result.insertedId}`);
      return result.insertedId;
    },
  );
};
// READ all users
const getAllAcccountsOnHold = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('hold').find({}).toArray();
    // print the results
    // console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// find an on hold user account given their ID
const getAccountOnHold = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('hold').findOne({ _id: ObjectId(userID) });
    // print the results
    // console.log(`User On Hold: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const deleteAccountOnHold = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('hold').deleteOne(
      { _id: ObjectId(userID) },
    );
    // print the results
    // console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// export the functions
module.exports = {
  connect,
  addUser,
  getAllUsers,
  getAUser,
  updateUserPassword,
  deleteUser,
  closeMongoDBConnection,
  getDB,
  addFollower,
  addFollowee,
  getFollowers,
  getFollowing,
  deleteFollowee,
  deleteFollower,
  getUserByEmail,
  getAComment,
  getAllComments,
  getAllPosts,
  getAPost,

  setCurrentUser,
  getCurrentUser,
  deleteCurrentUser,
  addPostToDB,
  addCommentToDB,
  addCommentToPost,
  setAccountOnHold,
  getAccountOnHold,
  deleteAccountOnHold,
  getAllAcccountsOnHold,
};
