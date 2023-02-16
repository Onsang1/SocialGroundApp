import axios from 'axios';

// mockAPI URL
// const rootURL ='https://633a4b96471b8c39556b9649.mockapi.io/api/v1/Student';
// JSON-server URL
const rootURL = 'http://localhost:8000/users';
// Sends a Get request to the /user endpoint
// returns all the users in the DB
export const getUsers = async () => {
  try {
    const response = await axios.get(`${rootURL}`);
    return response.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    // console.error(err);
  }
  return false;
};

// Takes the id of a user as input
// and sends a Get request to the /user:id endpoint
// returns the attributes of the user
export const getUser = async (userID) => {
  try {
    const response = await axios.get(`${rootURL}/${userID}`);
    return response.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};

// Takes a user (without the id) as input
// and sends a POST request to the /user endpoint
// returns the attributes of the user with the id
export const createUser = async (userObject) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      `${rootURL}`,
      `fullName=${userObject.fullName}&password=${userObject.password}&email=${userObject.email}`,
      config,
    );
    // console.log(`fullName=${userObject.fullName}&password=$
    // {userObject.password}&email=${userObject.email}`);
    return response.data;
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
  }
  return false;
};
