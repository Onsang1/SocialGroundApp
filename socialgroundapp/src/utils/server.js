// scripts: "start": "node server.js"// "main": "server.js"
// (1) import express
// backend ==> require
const express = require('express');

// (2) import and enable cors (cross-origin resource sharing)
// script needs to come from same server
const cors = require('cors');

// import json web token
const jwt = require('jsonwebtoken');

// secret key
const secret = 'thi_iSz_a_Very_$trong&_$ecret_keY';

// (3) create an instance of the express app
const webapp = express();

// (4) enable cors
webapp.use(cors());

// (6) configure express to parse bodies
webapp.use(express.urlencoded({ extended: true }));
webapp.use(express.json());

// (7) import the db interaction module
const dbLib = require('./dbFunctions');

// (8) declare a db reference variable
// let db;

// root endpoint / route
webapp.get('/', (req, resp) => {
  resp.json({ message: 'Welcome to our backend' });
});

// implement the GET user endpoint
webapp.get('/users/', async (req, res) => {
  console.log('READ all users');
  try {
    // get data from the db
    const results = await dbLib.getAllUsers();
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});
//+++++++++++++++++
// 121722
webapp.get('/user/:email', async (req, res) => {
  console.log('READ a user by email');
  try {
    // check that the parameter
    // get data from the db
    const results = await dbLib.getUserByEmail(req.params.email);
    // eslint-disable-next-line no-bitwise
    if (results === null) {
      res.status(404).json({ error: 'unknown user' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'invalid user email' });
  }
});
// +++++++++++++++++

// implement the GET user/:id endpoint
webapp.get('/user/:id', async (req, res) => {
  console.log('READ a user');
  try {
    // check that the parameter
    // get data from the db
    const results = await dbLib.getAUser(req.params.id);
    // eslint-disable-next-line no-bitwise
    if (results === null) {
      res.status(404).json({ error: 'unknown user' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'invalid user id' });
  }
});

// curl -X POST http://localhost:8080/users/ -d "name=james&username=jb&email=james@gmail.com&password=pw123"
// implement the POST user/ endpoint
webapp.post('/users/', async (req, res) => {
  console.log('CREATE a user');
  const check1 = req.body?.name;
  const check2 = req.body?.email;
  const check3 = req.body?.username;
  const check4 = req.body?.password;
  // parse the body of the request
  if (check1 === undefined || check2 === undefined
    || check3 === undefined || check4 === undefined) {
    res.status(404).json({ message: 'missing information' });
    return;
  }
  try {
    // create the new user
    const newUser = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      following: [],
      follower: [],
      postCount: 0,
    };
    const result = await dbLib.addUser(newUser);
    // send the response with the appropriate status code
    res.status(201).json({ data: { id: result, ...newUser } });
  } catch (err) {
    res.status(409).json({ message: 'Fail to add user' });
  }
});

// // implement the PUT user/:followeeId/follow/ endpoint
// webapp.put('/user/:followeeId/follow/', async (req, res) => {
//   console.log('Add a follower');
//   // parse the body of the request
//   if (!req.body.followerId) {
//     res.status(404).json({ message: 'missing information' });
//     return;
//   }
//   try {
//     const result = await dbLib.addFollower(db, req.params.followeeId, req.body.followerId);
//     // send the response with the appropriate status code
//     res.status(200).json({ message: result });
//   } catch (err) {
//     res.status(409).json({ message: 'Fail to add follower' });
//   }
// });

// implement the PUT user/:followerId/follow/ endpoint
webapp.put('/user/:followerId/follow/:followeeId', async (req, res) => {
  console.log('Follow updated');
  console.log(`server followerId: ${req.params.followerId}`);
  // parse the body of the request
  try {
    const result = await dbLib.addFollower(req.params.followeeId, req.params.followerId);
    const result2 = await dbLib.addFollowee(req.params.followeeId, req.params.followerId);
    // send the response with the appropriate status code
    res.status(200).json({ message: result, result2 });
  } catch (err) {
    res.status(409).json({ message: 'Fail to update follow' });
  }
});

// curl -X DELETE http://localhost:8080/user/123
// implement the DELETE user/id endpoint
webapp.delete('/users/:id', async (req, res) => {
  console.log('DELETE a user');
  try {
    const result = await dbLib.deleteUser(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'user not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
    console.log(res.status);
  } catch (err) {
    res.status(404).json({ message: 'delete error' });
  }
});

// implement the PUT user/:followerId/unfollow/ endpoint
webapp.put('/user/:followerId/unfollow/:followeeId', async (req, res) => {
  console.log('Unfollow updated');
  try {
    // if (!req.body.followeeId) {
    //   res.status(404).json({ message: 'missing information' });
    //   return;
    // }
    const result = await dbLib.deleteFollowee(req.params.followeeId, req.params.followerId);
    const result2 = await dbLib.deleteFollower(req.params.followeeId, req.params.followerId);
    // send the response with the appropriate status code
    res.status(200).json({ message: result, result2 });
  } catch (err) {
    res.status(404).json({ message: 'delete error' });
  }
});

// // implement the DELETE user/:followeeId/unfollow/ endpoint
// webapp.delete('/user/:followeeId/unfollow/', async (req, res) => {
//   console.log('DELETE a follower');
//   try {
//     if (!req.body.followerId) {
//       res.status(404).json({ message: 'missing information' });
//       return;
//     }
//     const result = await dbLib.deleteFollower(db, req.params.followeeId, req.body.followerId);
//     // send the response with the appropriate status code
//     res.status(200).json({ message: result });
//   } catch (err) {
//     res.status(404).json({ message: 'delete error' });
//   }
// });

// curl -X PUT -d "password=pw12345" http://localhost:8080/user/123
// implement the PUT user/id endpoint
webapp.put('/users/:id', async (req, res) => {
  const check = req.body?.password;
  if (check === undefined) {
    res.status(404).json({ message: 'missing password' });
    return;
  }
  try {
    const result = await dbLib.updateUserPassword(req.params.id, req.body.password);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'update error' });
  }
});

/**
 * Login endpoint
 */
webapp.post('/login', (req, res) => {
  console.log('create a new session');
  // check that the username was sent
  if (!req.body.username) {
    res.status(401).json({ error: 'missing username' });
    res.end();
  }
  // sign the token and send it to the frontend
  try {
    const jwtoken = jwt.sign({ username: req.body.username }, secret, { expiresIn: '120s' });
    res.status(201).json({ token: jwtoken });
  } catch (err) {
    res.status(401).json({ error: 'there was an error' });
  }
});

webapp.get('/currentUser/', async (req, res) => {
  console.log('get current user');
  // parse the body of the request
  // const userID = '6376d6d927d24d3dd3e4d88a';
  try {
    const result = await dbLib.getCurrentUser();
    // send the response with the appropriate status code
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'Failed to get current user' });
  }
});

webapp.get('/currentUser/followers', async (req, res) => {
  console.log('get the following list of current user');
  // parse the body of the request
  // const userID = '6376d6d927d24d3dd3e4d88a';
  try {
    const result = await dbLib.getFollowers();
    // send the response with the appropriate status code
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'Failed to get current user' });
  }
});

webapp.get('/currentUser/following', async (req, res) => {
  console.log('get the following list of current user');
  // parse the body of the request
  // const userID = '6376d6d927d24d3dd3e4d88a';
  try {
    const result = await dbLib.getFollowing();
    // send the response with the appropriate status code
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ message: 'Failed to get current user' });
  }
});

webapp.delete('/currentUser/', async (req, res) => {
  console.log('DELETE current user');
  try {
    const result = await dbLib.deleteCurrentUser();
    // if (result.deletedCount === 0) {
    //   res.status(404).json({ error: 'user not in the system' });
    //   return;
    // }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
    console.log(res.status);
  } catch (err) {
    res.status(404).json({ message: 'delete error' });
  }
});

webapp.post('/currentUser/', async (req, res) => {
  console.log('set current user');
  // parse the body of the request
  if (req.body === undefined || !req.body) {
    res.status(404).json({ message: 'missing information' });
    return;
  }
  try {
    const currUser = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      following: req.body.following,
      follower: req.body.follower,
      postCount: req.body.postCount,
      suggested: ['6376d6d927d24d3dd3e4d88a', '6389982a373e83308395e820', '638a6556f3d7adc2733aec7d', '638aa82c698c2c18f20de209'],
      realUserId: req.body.realUserId,
    };// 121722
    console.log('current user at line 296 is +++++++++++++++');
    console.log(currUser);
    console.log('req.body at line 296 is +++++++++++++++');
    console.log(req.body);

    const result = await dbLib.setCurrentUser(currUser);
    // send the response with the appropriate status code
    res.status(201).json({ data: { id: result, ...currUser } });
  } catch (err) {
    res.status(409).json({ message: 'Failed to add current user' });
  }
});

// webapp.get('/currentUser/', async (req, res) => {
//   console.log('get current user');
//   // parse the body of the request
//   try {
//     const result = await dbLib.getCurrentUser();
//     // send the response with the appropriate status code
//     res.status(200).json({ data: result });
//   } catch (err) {
//     res.status(404).json({ message: 'Failed to get current user' });
//   }
// });

// webapp.post('/currentUser/', async (req, res) => {
//   console.log('set current user');
//   // parse the body of the request
//   if (req.body === undefined || !req.body) {
//     res.status(404).json({ message: 'missing information' });
//     return;
//   }
//   try {
//     const currUser = {
//       username: req.body.username,
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       following: req.body.following,
//       follower: req.body.follower,
//       postCount: req.body.postCount,
//     };
//     const result = await dbLib.setCurrentUser(currUser);
//     // send the response with the appropriate status code
//     res.status(201).json({ data: { id: result, ...currUser } });
//   } catch (err) {
//     res.status(409).json({ message: 'Failed to add current user' });
//   }
// });

// curl -X PUT -d "password=pw12345" http://localhost:8080/user/123
// implement the PUT user/id endpoint
// webapp.put('/users/:id', async (req, res) => {
//   const check = req.body?.password;
//   if (check === undefined) {
//     res.status(404).json({ message: 'missing password' });
//     return;
//   }
//   try {
//     const result = await dbLib.updateUserPassword(req.params.id, req.body.password);
//     // send the response with the appropriate status code
//     res.status(200).json({ message: result });
//   } catch (err) {
//     res.status(404).json({ message: 'update error' });
//   }
// });

/**
 * Comment endpoints
 */

// curl -X PUT -d "commentId=638a65a08ee524a5d84d14e8" http://localhost:8080/posts/6376e52e15dd8a7a841cd930/comments/
webapp.put('/posts/:postId/comments/', async (req, res) => {
  console.log('Update the comment list of a post');
  console.log('server.js line 366 req.body is: ');
  console.log(req.body);
  console.log(req.body.comments);
  console.log(req.body.comments.length - 1);

  // parese the body of the request
  // if (req.body.comments) {
  //   res.status(404).json({ message: 'missing information' });
  //   return;
  // }
  console.log('server.js line 373 req.params is: ');
  console.log(req.params);
  console.log(req.body.comments[req.body.comments.length - 1]);
  try {
    const result = await dbLib.addCommentToPost(req.body.comments[req.body.comments.length - 1], req.params.postId);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'update error' });
  }
});

//     // create the new comment
//     const newComment = {
//       content: req.body.content,
//       userId: req.body.userId,
//     };
//     const result = await dbLib.addComment(newComment, req.params.postId);
//     // send the response with the appropriate status code
//     // 201 = new resource is created
//     // 200 = general success
//     res.status(201).json({ data: { id: result, ...newComment } });
//   } catch (err) {
//     // 409 = already exists
//     // 404 = not found
//     res.status(404).json({ message: 'Fail to add a comment' });
//   }
// });

// await request(webapp).post(`post/${postID}/comment`)
/**
 * just adding 1 comment to db without changing the post comment list
 */
webapp.post('/comments/', async (req, res) => {
  console.log('add a comment to db');
  // parese the body of the request
  if (!req.body.content || !req.body.userId) {
    res.status(404).json({ message: 'missing information' });
    return;
  }
  try {
    // create the new comment
    const newComment = {
      content: req.body.content,
      userId: req.body.userId,
    };
    const result = await dbLib.addCommentToDB(newComment);
    // send the response with the appropriate status code
    // 201 = new resource is created
    // 200 = general success
    res.status(201).json({ data: { id: result, ...newComment } });
  } catch (err) {
    // 409 = already exists
    // 404 = not found
    res.status(404).json({ message: 'Fail to add a comment' });
  }
});

// implement the GET comment endpoint
webapp.get('/comments/', async (req, res) => {
  console.log('READ all comments');
  try {
    // get data from the db
    const results = await dbLib.getAllComments();
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

// implement the GET comments/:id endpoint
webapp.get('/comments/:id', async (req, res) => {
  console.log('READ a comment');
  try {
    // check that the parameter
    // get data from the db
    const results = await dbLib.getAComment(req.params.id);
    // eslint-disable-next-line no-bitwise
    if (results === null) {
      res.status(404).json({ error: 'unknown comment' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'invalid comment id' });
  }
});

/**
 * Post
 */
// GET /posts/ endpoint
webapp.get('/posts/', async (req, res) => {
  console.log('READ all posts');
  try {
    // get data from the db
    const results = await dbLib.getAllPosts();
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

// implement the GET /posts/:id endpoint
webapp.get('/posts/:id', async (req, res) => {
  console.log('READ a post');
  try {
    // check that the parameter
    // get data from the db
    const results = await dbLib.getAPost(req.params.id);
    // eslint-disable-next-line no-bitwise
    if (results === null) {
      res.status(404).json({ error: 'unknown post' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'invalid post id' });
  }
});

// implement the POST posts endpoint
// curl -X POST http://localhost:8080/posts/ -d "content=https://images.freeimages.com/images/large-previews/1c1/links-1242361.jpg&userId=6376d6d927d24d3dd3e4d88a&author=Bret&caption=PrettyPin&comments=''"
webapp.post('/posts/', async (req, res) => {
  console.log('add post to db');
  // parse the body of the request
  // if (false) {
  if (!req.body.content || !req.body.userId || !req.body.author) {
    res.status(404).json({ message: 'missing information' });
    console.log('create post missing');
    return;
  }
  try {
    // upload file to S3
    console.log('request body content:', req.body.content);
    const decodedUrl = decodeURIComponent(req.body.content);
    console.log('decoded url:', decodedUrl);
    // const returnUrl = await s3.uploadFile("test_file8", decodedUrl);
    // console.log('url is:', returnUrl);
    // console.log("request body", req.body.content)

    // create the new comment
    // get the url from uploadFile function in S3 code example
    const newPost = {
      content: decodedUrl,
      userId: req.body.userId,
      author: req.body.author,
      caption: req.body.caption,
      comments: [],
    };
    const result = await dbLib.addPostToDB(newPost);
    // send the response with the appropriate status code
    // 201 = new resource is created
    // 200 = general success
    res.status(201).json({ data: { id: result, ...newPost } });
  } catch (err) {
    console.log('error', err);
    // 409 = already exists
    // 404 = not found
    res.status(404).json({ message: 'Fail to add a post' });
  }
});

/**
 * Catch all endpoints
 */
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});

// do not forget to export the express server
module.exports = webapp;
