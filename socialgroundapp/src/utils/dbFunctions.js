/* eslint-disable no-underscore-dangle */
// "start": "node dbFunctions.js",   -- input in package.json

// import the mongodb driver
// const { result } = require('lodash');
const { NetworkCheckSharp } = require('@mui/icons-material');
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
    const db = await getDB();
    const result = await db.collection('users').findOne({ _id: ObjectId(userID) });
    // print the results
    console.log(`Get A User: ${JSON.stringify(result)}`);
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
    console.log(`User at line 120 of dbFunctions.js: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

/**
 * UPDATE USER INFORMATION
 */
//
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
      console.log(`New user created with id: ${result.insertedId}`);
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
    console.log(`calling getCurrentUser..Current user: ${JSON.stringify(result)}`);
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
    console.log(`Current user: ${JSON.stringify(result)}`);
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
    // console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

/**
 * This MongoDB function adds a new comment to a post resource
 * commentID(ObjectId), postID(ObjectId), author (ObjectId)
 * post/postId/comments
 * userID
 * 1. first add the new comment in the comments schema (get insertedId)
 * 2. put insertedId into the corresponding post in the posts collection comment field
 *
 *
 *
 * TA:
 * 1. insert 1 comment in the comments schema
 * 2. update the comments field of the post with the postId (append the comment id into the array)
 * @param {} newComment is a comment object; postId is a
 */
// const addComment = async (newComment,postId) => {
//   // get the db
//   const db = await getDB();
//   db.collection('comments').insertOne(
//     // insert a json object
//     newComment,
//     (err, result) => {
//       if (err) {
//         console.log(`error: ${err.message}`);
//       }
//       // print id of comment
//       console.log(`New comment created with id: ${result._id}`);
//       // return result.insertedId;
//     },
//   );
//   // step 2
//   const postToEdit = db.collection('posts').findOne({ _id: ObjectId(postId) });
//   const oldComment = postToEdit.comments;
//   const newComment2 = oldComment.push
// (db.collection('comments').findOne({ _id: ObjectId(result._id) }));
//   db.posts.updateOne(
//     { _id: postId },
//     { $set: {
//       comments: newComment2
//     }})
//   return result._id;
// };
// // update post comment
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
    // const postToEdit = db.collection('posts').findOne({ _id: ObjectId(postId) });
    // const oldComment = postToEdit.comments;
    // const newComment2 = oldComment.push(db.collection('comments').
    // findOne({ _id: ObjectId(commentId) }));
    // const result = db.posts.updateOne(
    //   { _id: postId },
    //   { $set: {
    //     comments: newComment2
    //   }},);
    // print the results
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
    console.log(`Comments: ${JSON.stringify(result)}`);
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
    console.log(`Comments: ${JSON.stringify(result)}`);
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
    console.log(`Comments: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// Find a post by userId
const getPostByUser = async (user) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').find({ userId: user }).toArray();
    console.log('posts match current user', result)
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

const updatePostCaption = async (postId, newCaption) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').updateOne(
      { _id: ObjectId(postId) },
      { $set: { caption: newCaption } },
    );
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const deletePost = async (postID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('posts').deleteOne(
      { _id: ObjectId(postID) },
    );
    // print the results
    // console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

// add a field hidden in post, store list of userid in hidden
const addHiddenUserToPost = async (userId, postId) => {
  try {
    const db = await getDB();
    const result = db.collection('posts').updateOne(
      { _id: ObjectId(postId) },
      { $push: { hidden: userId } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const deleteFollowee = async (followeeId, followerId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(followerId) },
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
    const result = await db.collection('users').findOne({ _id: ObjectId(userID) }, { projection: { follower: 1 } });
    // print the results
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const getFollowing = async (userID) => {
  try {
    const db = await getDB();
    const result = await db.collection('users').findOne({ _id: ObjectId(userID) }, { projection: { following: 1 } });
    // print the results
    console.log(`followinglist: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const addFollower = async (followeeId, followerId) => {
  try {
    const db = await getDB();
    console.log(`addFollower followeeId: ${followeeId}`);
    const result = db.collection('users').updateOne(
      { _id: ObjectId(followeeId) },
      { $push: { follower: ObjectId(followerId) } },
    );
    // print id of user
    console.log(`New follower added: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const addFollowee = async (followeeId, followerId) => {
  try {
    const db = await getDB();
    console.log(`New followeeId: ${JSON.stringify(followeeId)}`);
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(followerId) },
      { $push: { following: ObjectId(followeeId) } },
    );
    // print id of user
    console.log(`New followee added: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};

const updateLikes = async (postId, newlikes) => {
  try {
    const db = await getDB();
    console.log('calling updatelikes in dbFunctions');
    console.log(`PostId: ${postId}`);
    console.log(`newlikes: ${newlikes}`);
    const result = await db.collection('posts').updateOne(
      { _id: ObjectId(postId) },
      { $set: { likes: newlikes } },
    );
    // print id of user
    console.log(`Likes updated: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
  return null;
};
// find an on hold user account given their ID
const setAccountOnHold = async (userAccount) => {
  // get the db
  const userAccountObj = {
    _id: ObjectId(userAccount._id),
    time: userAccount.time,
  };
  const db = await getDB();
  db.collection('hold').insertOne(
    userAccountObj,
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
  updateLikes,
  getUserByEmail,
  getAComment,
  getAllComments,
  getAllPosts,
  getAPost,
  getPostByUser,
  deletePost,
  setCurrentUser,
  getCurrentUser,
  deleteCurrentUser,
  addPostToDB,
  updatePostCaption,
  addHiddenUserToPost,
  addCommentToDB,
  addCommentToPost,
  getAccountOnHold,
  setAccountOnHold,
  deleteAccountOnHold,
  getAllAcccountsOnHold,
};
