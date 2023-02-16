/* eslint-disable no-console */
import axios from 'axios';

// mockAPI URL
// const rootURL ='https://633a4b96471b8c39556b9649.mockapi.io/api/v1/Student';
// JSON-server URL
const rootURL = 'http://localhost:8000';

// Sends a Get request to the /user endpoint
// returns all the users in the DB
export const getUsers = async () => {
  try {
    const response = await axios.get(`${rootURL}/users`);
    console.log(response.data);
    // return response.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
  }
  return false;
};

// Takes the id of a user as input
// and sends a Get request to the /user:id endpoint
// returns the attributes of the user
export const getUser = async (userID) => {
  try {
    const response = await axios.get(`${rootURL}/users/${userID}`);
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
    const response = await axios.post(
      `${rootURL}/users`,
      `username=${userObject.username}&name=${userObject.name}&email=${userObject.email}&password=${userObject.password}&following=${userObject.following}&followers=${userObject.followers}`,
    );
    return response.data;
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const updateFollow = async (follower, following, action) => {
  const followingList = follower.following;
  const followerList = following.followers;
  try {
    switch (action) {
      case 'follow': {
        followingList.push(following.id);
        followerList.push(follower.id);
        await axios.put(
          `${rootURL}/currentUser/${follower.id}`,
          (follower),
        );
        console.log('after put');
        await axios.put(
          `${rootURL}/users/${following.id}`,
          (following),
        );
        break;
      }
      case 'unfollow': {
        const index1 = followingList.indexOf(follower.id);
        followingList.splice(index1, 1);
        const index2 = followingList.indexOf(follower.id);
        followerList.splice(index2, 1);
        await axios.put(
          `${rootURL}/currentUser/${follower.id}`,
          (follower),
        );
        await axios.put(
          `${rootURL}/users/${following.id}`,
          (following),
        );
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

// convert a file to base64 string
// export const getBase64 = async (file) => {
//   const reader = new FileReader();
//   const base64 = reader.readAsDataURL(file);
//   return base64;
// };

// post the base64 of selected photo to json-server
export const createPost = async (file, userInfo) => {
  try {
    const reader = new FileReader();
    reader.onloadend = async function onloadend() {
      const response = await axios.post(`${rootURL}/posts`, {
        caption: userInfo.caption,
        body: reader.result,
        author: userInfo.author,
        userId: userInfo.userId,
        id: userInfo.id,
      });
      return response.data;
    };
    reader.readAsDataURL(file);
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${rootURL}/posts`);
    // const json = JSON.parse(response.data);
    return response.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const deletePosts = async (post) => {
  try {
    const response = await axios.delete(`${rootURL}/posts/${post.id}`);
    // const json = JSON.parse(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return false;
};
