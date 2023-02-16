// in package.json "test": "jest --coverage --runInBand"
// import supertest
const request = require('supertest');
// import the function to close the mongodb connection

const { closeMongoDBConnection, connect } = require('./dbFunctions');

// import the express server
const webapp = require('./server');

// connection to the DB
let mongo;

describe('POST /user endpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  /**
     * We need to make the request to the endpoint
     * before running any test
     * We need to connect to the DB for all the DB checks
     * if beforeAll is underfined
     * inside .eslinrc.js, add 'jest' to the 'env' key
     */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response
    response = await request(webapp).post('/user')
      .send('name=testuser&email=user123@gmail.com&password=test123');
  });

  /**
   * removes all testing data from the DB
   */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('users').deleteOne({ name: 'testuser' });
      console.log('result: ', result);
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  /**
 * After running the tests, we need to remove any test data from the db
 * We need to close the mongoDB connection
 */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await clearDatabase();
      await mongo.close(); // the test file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
    return null;
  });

  /**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new user is returned', () => {
    const insertedUser = { name: 'testuser', email: 'user123@gmail.com', password: 'user123' };
    expect(JSON.parse(response.text).data).toMatchObject(insertedUser); // status code
  });

  test('the new user is in the db', () => {
    const testUser = { name: 'testuser', email: 'user123@gmail.com', password: 'user123' };
    expect(JSON.parse(response.text).data).toMatchObject(testUser); // status code
  });
});
