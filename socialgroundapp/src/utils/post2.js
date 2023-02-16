// in package.json "test": "jest --coverage --runInBand"
// import supertest
const request = require('supertest');
const { ObjectId } = require('mongodb');
// import the function to close the mongodb connection

const { closeMongoDBConnection, connect } = require('./dbFunctions');

// import the express server
const webapp = require('./server');

// connection to the DB
let mongo;

describe('POST /posts/ endpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  let testPostId;
  const testPost = {
    content: 'https://images.freeimages.com/images/large-previews/1c1/links-1242361.…',
    userId: '6376d6d927d24d3dd3e4d88a',
    author: 'Bret',
    caption: 'PrettyPin',
    comments: [],
  };
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
    response = await request(webapp).post('/posts/')
      .send('content=https://images.freeimages.com/images/large-previews/1c1/links-1242361.…&userId=6376d6d927d24d3dd3e4d88a&author=Bret&caption=PrettyPin');
    // eslint-disable-next-line no-underscore-dangle
    testPostId = JSON.parse(response.text).data._id;
  });

  /**
     * removes all testing data from the DB
     */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('posts').deleteOne({ content: 'This is a jest testing post!' });
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
  // test('the new post is in the db', async () => {
  //   const insertedPost = await db.collection('posts').findOne({ content:"https://images.freeimages.com/images/large-previews/1c1/links-1242361.…" });
  //   expect(insertedPost.postId).toEqual('638bff899435a3a9d460e518');
  // });

  // test('missing a field (content) 404', async () => {
  //   const res = await request(webapp).post('/posts/')
  //     .send('userId=6376d6d927d24d3dd3e4d88a');
  //   expect(res.status).toEqual(404);
  // });

  // test('Get all posts endpoint status code and data', async () => {
  //   const resp = await request(webapp).get('/posts/');
  //   expect(resp.status).toEqual(200);
  //   expect(resp.type).toBe('application/json');
  //   const postArr = JSON.parse(resp.text).data;
  //   // testPost is in the response
  //   console.log(postArr)
  //   expect(postArr).toEqual(expect.arrayContaining([{ _id: testPostId, ...testPost }]));
  // });

  // test('Get a post endpoint status code and data', async () => {
  //   const resp = await request(webapp).get(`/posts/${testPostId}`);
  //   expect(resp.status).toEqual(200);
  //   expect(resp.type).toBe('application/json');
  //   const postArr = JSON.parse(resp.text).data;
  //   // testUser is in the response
  //   expect(postArr).toMatchObject({ _id: testPostId, ...testPost });
  // });

  test('post is not in db status code 404', async () => {
    const resp = await request(webapp).get('/posts/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});
