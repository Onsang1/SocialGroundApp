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

// implement the GET user/:id endpoint
webapp.get('/users/:id', async (req, res) => {
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

// curl -X POST http://localhost:8080/users/ -d "name=james&email=james@gmail.com&password=pw123"
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
  try {
    const result = await dbLib.getCurrentUser();
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
    };
    const result = await dbLib.setCurrentUser(currUser);
    // send the response with the appropriate status code
    res.status(201).json({ data: { id: result, ...currUser } });
  } catch (err) {
    res.status(409).json({ message: 'Failed to add current user' });
  }
});

/**
 * Comment endpoints
 */

// curl -X PUT -d "commentId=638a65a08ee524a5d84d14e8" http://localhost:8080/posts/6376e52e15dd8a7a841cd930/comments/
webapp.put('/posts/:postId/comments/', async (req, res) => {
  console.log('Update the comment list of a post');
  // parese the body of the request
  if (!req.body.commentId) {
    res.status(404).json({ message: 'missing information' });
    return;
  }
  try {
    const result = await dbLib.addCommentToPost(req.body.commentId, req.params.postId);
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

// catch all endpoint
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});

// do not forget to export the express server
module.exports = webapp;
