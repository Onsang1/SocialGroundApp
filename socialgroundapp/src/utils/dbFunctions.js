// "start": "node dbFunctions.js",   -- input in package.json

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import objectID
const { ObjectId } = require('mongodb');

// mongodb server URL - input db name
const dbURL = 'temp';

// connection to the db
const connect = async () => {
  // always use try/catch to handle any exceptions
  try {
    const con = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    // check that we are connected to the db
    console.log(`connected to db: ${con.databaseName}`);
    return con;
  } catch (err) {
    console.log(err.message);
  }
  return null;
};

// CREATE a new user
// takes a db connector and user object
// and add the user to the DB
const addUser = (db, newUser) => {
  // callback version
  db.collection('schema name').insertOne(
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
const getAllUsers = async (db) => {
  try {
    const result = await db.collection('schema name').find({}).toArray();
    // print the results
    console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return 0;
};

// READ a user given their ID
const getAUser = async (db, userID) => {
  try {
    const result = await db.collection('schema name').findOne({ _id: ObjectId(userID) });
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return 0;
};

const updateUserPassword = async (db, userID, newPassword) => {
  try {
    const result = await db.collection('schema name').updateOne(
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

const deleteUser = async (db, userID) => {
  try {
    const result = await db.collection('schema name').deleteOne(
      { _id: ObjectId(userID) },
    );
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// main function to execute code
// const main = async () => {
//   const conn = await connect();
//   addUser(conn, { name: 'user1', email: 'user1@gmail.com', password: 'user123' });
//   //   await getAllUsers(conn);
//   //   await getAUser(conn, 123);
//   // await updateUserPassword(conn, 'userID', 'newpassword');
//   await deleteUser(conn, 'userID');
// };

// execute main
// main();

// export the functions
module.exports = {
  connect, addUser, getAllUsers, getAUser, updateUserPassword, deleteUser,
};
