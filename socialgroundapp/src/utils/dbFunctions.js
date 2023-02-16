// "start": "node dbFunctions.js",   -- input in package.json

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import objectID
const { ObjectId } = require('mongodb');

// mongodb server URL - input db name
const dbURL = 'mongodb+srv://SGadmin:<sgadmin2022>@sgcluster0.euaseyl.mongodb.net/?retryWrites=true&w=majority';

/**
 * MongoDB database connection
 * It will be exported so we can close the connection
 * after running our tests
 */
let MongoConnection;

// connection to the db
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
      console.log(`New user created with id: ${result.insertedId}`);
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
    console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return 0;
};

// READ a user given their ID
const getAUser = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ _id: ObjectId(userID) });
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return 0;
};

const updateUserPassword = async (userID, newPassword) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(userID) },
      { $set: { password: newPassword } },
    );
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
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
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// READ all posts
const getAllPosts = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').find({}).toArray();
    // print the results
    console.log(`Posts: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return 0;
};

// READ a post given its ID
const getAPost = async (postId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').findOne({ _id: ObjectId(postId) });
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return 0;
};

// Delete a post
const deletePost = async (postId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').deleteOne(
      {_id:ObjectId(postId)},
    );
    // print the results
    console.log(`Posts: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return 0;
};

// export the functions
module.exports = {
  connect,
  addUser,
  getAllUsers,
  getAUser,
  updateUserPassword,
  deleteUser,
  getAllPosts,
  getAPost,
  deletePost,
  closeMongoDBConnection,
  getDB,
};

