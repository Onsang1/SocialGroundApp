// scripts: "start": "node server.js"// "main": "server.js"
// (1) import express
// backend ==> require
const express = require('express');

// (2) import and enable cors (cross-origin resource sharing)
// script needs to come from same server
const cors = require('cors');

// (3) create an instance of the express app
const webapp = express();

// (4) enable cors
webapp.unsubscribe(cors());

// (5) define the port
const port = 8080;

// (6) configure express to parse bodies
webapp.use(express.urlencoded({ extended: true }));

// (7) import the db interaction module
const dbLib = require('./dbFunctions');

// (8) declare a db reference variable
let db;
webapp.listen(port, async () => {
  db = await dbLib.connect(port);
});

// start the server
webapp.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// root endpoint / route
webapp.get('/', (req, resp) => {
  resp.json({ message: 'Welcome to our backend' });
});

// implement the GET user endpoint
webapp.get('/users', async (req, res) => {
  console.log('READ all users');
  try {
    // get data from the db
    const results = await dbLib.getAllUsers(db);
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there is an error' });
  }
});

// implement the GET user/:id endpoint
webapp.get('/user/:id', async (req, res) => {
  console.log('READ a user');
  try {
    // check that the parameter
    // get data from the db
    const results = await dbLib.getAUser(db, req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'invalid user id' });
  }
});

// curl -X POST http://localhost:8080/user/ -d "name=james&email=james@gmail.com&password=pw123"
// implement the POST user/ endpoint
webapp.post('/user/', async (req, res) => {
  console.log('CREATE a user');
  // parese the body of the request
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(404).json({ message: 'missing information' });
    return;
  }
  try {
    // create the new user
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await dbLib.addUser(db, newUser);
    // send the response with the appropriate status code
    res.status(201).json({ data: { id: result, ...newUser } });
  } catch (err) {
    res.status(409).json({ message: 'Fail to add user' });
  }
});

// curl -X DELETE http://localhost:8080/user/123
// implement the DELETE user/id endpoint
webapp.delete('/user/:id', async (req, res) => {
  console.log('DELETE a user');
  try {
    const result = await dbLib.deleteUser(db, req.params.id);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'delete error' });
  }
});

// curl -X PUT -d "password=pw12345" http://localhost:8080/user/123
// implement the PUT user/id endpoint
webapp.put('/user/:id', async (req, res) => {
  console.log('UPDATE a user');
  if (!res.body.password) {
    res.status(404).json({ message: 'missing password' });
    return;
  }
  try {
    const result = await dbLib.updateUserPassword(db, req.params.id, req.body.password);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'update error' });
  }
});

// catch all endpoint
// catch all endpoint
webapp.use((req, resp) => {
  resp.status(404).json({ error: 'invalid endpoint' });
});
