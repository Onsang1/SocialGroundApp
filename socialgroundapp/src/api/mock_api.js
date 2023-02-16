/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import axios from 'axios';

// const { ObjectId } = require('mongodb');
// import { useState, useEffect } from 'react';

// JSON-server URL
const rootURL = 'http://localhost:8080';

const setHeaders = () => {
  // eslint-disable-next-line dot-notation
  axios.defaults.headers.common['authorization'] = (
    sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null;
};
/**
 *
 * deletes any (expired) token and relaunch the app
 */
const reAuthenticate = (status) => {
  if (status === 401) {
    // delete the token
    sessionStorage.removeItem('app-token');
    sessionStorage.removeItem('user');
    // reload the app
    // window.location.reload(true);
  }
};
// Sends a Get request to the /user endpoint
// returns all the users in the DB
export const getUsers = async () => {
  // const [data, setData] = useState(null);
  setHeaders();
  try {
    const response = await axios.get(`${rootURL}/users`);

    // console.log(response.data.data);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

// Takes the id of a user as input
// and sends a Get request to the /user:id endpoint
// returns the attributes of the user
export const getUser = async (userID) => {
  try {
    // add the token to the header
    setHeaders();
    // console.log('in getUser mockapi');
    // console.log('user id is', userID);
    const response = await axios.get(`${rootURL}/user/${userID}`);
    // console.log('mockapi response is', response);
    // reAuthenticate(response.status);
    return response.data.data;
  } catch (err) {
    // console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

export const getCurrentUser = async () => {
  try {
    // add the token to the header
    setHeaders();
    const response = await axios.get(`${rootURL}/currentUser/`);
    console.log('+++++++++++++++++++++++++mock_api line 55:');
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const setCurrentUser = async (userObject) => {
  try {
    // add the token to the header
    setHeaders();
    // const userId = JSON.stringify(userObject._id);

    // const suggested = ['6389982a373e83308395e820',
    // '638a6556f3d7adc2733aec7d', '638aa82c698c2c18f20de209'];
    console.log('userObject is: +++++++++++++++++ ');
    console.log(userObject);
    console.log('userObject._id is: +++++++++++++++++ ');
    console.log(userObject._id);
    const response = await axios.post(`${rootURL}/currentUser/`, {
      username: userObject.username,
      name: userObject.name,
      email: userObject.email,
      password: userObject.password,
      following: userObject.following,
      follower: userObject.follower,
      postCount: userObject.postCount,
      suggested: [],
      realUserId: userObject._id,
    });
    // console.log(response);
    // 121722 - changed realUserId
    return response.data.data;
    // return the data with the id of the student
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
      `${rootURL}/user`,
      `username=${userObject.username}&name=${userObject.name}&email=${userObject.email}&password=${userObject.password}&following=${userObject.following}&followers=${userObject.followers}`,
    );
    // console.log(response);
    return response.data;
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const updateFollow = async (follower, followee, action) => {
  // const followingList = follower.following;
  // const followerList = following.followers;
  setHeaders();
  try {
    switch (action) {
      case 'follow': {
        console.log(`mockapi follower id info: ${follower.realUserId}`);
        await axios.put(
          `${rootURL}/user/${follower.realUserId}/follow/${followee._id}`,
        );
        console.log('after put');
        // await axios.put(
        //   `${rootURL}/users/${followee.id}`,
        //   (followee),
        // );
        break;
      }
      case 'unfollow': {
        // const index1 = followingList.indexOf(follower.id);
        // followingList.splice(index1, 1);
        // const index2 = followingList.indexOf(follower.id);
        // followerList.splice(index2, 1);
        await axios.put(
          `${rootURL}/user/${follower._id}/unfollow/${followee._id}`,
          // (follower),
        );
        // await axios.put(
        //   `${rootURL}/users/${following.id}`,
        //   (following),
        // );
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateLike = async (currentUser, post, action) => {
  setHeaders();
  try {
    switch (action) {
      case 'like': {
        console.log('currentuser id', currentUser.id);
        post.likes.push(currentUser.id);
        // console.log('like list:', post);
        await axios.put(
          `${rootURL}/posts/${post.id}`,
          (post),
        );
        break;
      }
      case 'unlike': {
        const index = post.likes.indexOf(currentUser.id);
        post.likes.splice(index, 1);
        await axios.put(
          `${rootURL}/posts/${post.id}`,
          (post),
        );
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

// convert a file to base64 string
// export const getBase64 = async (file) => {
//   const reader = new FileReader();
//   const base64 = reader.readAsDataURL(file);
//   return base64;
// };
export const createPost = async (file, postInfo, user) => {
  setHeaders();
  try {
    const reader = new FileReader();

    // const emptyArray = [];
    reader.onloadend = async function onloadend() {
      console.log('base64 is', reader.result);
      const encodedUrl = encodeURIComponent(reader.result);
      console.log('encoded url is', encodedUrl);
      // const buffer = new Buffer(reader.result)
      const response = await axios.post(`${rootURL}/posts`, `content=${encodedUrl}&userId=${user._id}&author=${user.username}&caption=${postInfo.caption}`);

      // const currentPostCount = user.postCount;
      return response.data.data;
    };

    await reader.readAsDataURL(file);
  } catch (err) {
    console.error(err);
  }
  return false;
};

// post the base64 of selected photo to json-server
// export const createPost = async (file, postInfo, user) => {
//   try {
//     const reader = new FileReader();
//     await axios.put(`${rootURL}/currentUser/${user.id}`, {
//       id: user.id,
//       name: user.name,
//       username: user.username,
//       email: user.email,
//       password: user.password,
//       following: user.following,
//       followers: user.followers,
//       postCount: user.postCount + 1,
//       suggested: user.suggested,
//     });

//     reader.onloadend = async function onloadend() {
//       const response = await axios.post(`${rootURL}/posts`, {
//         caption: postInfo.caption,
//         body: reader.result,
//         author: user.username,
//         userId: user.id,
//         id: Math.floor(Math.random() * 1000),
//       });
//       // const currentPostCount = user.postCount;
//       return response.data;
//     };

//     await reader.readAsDataURL(file);
//   } catch (err) {
//     console.error(err);
//   }
//   return false;
// };

export const getPosts = async () => {
  setHeaders();
  try {
    const response = await axios.get(`${rootURL}/posts`);
    // const json = JSON.parse(response.data);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    // console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

export const getAPost = async (postId) => {
  setHeaders();
  try {
    const response = await axios.get(`${rootURL}/posts/${postId}/`);
    // const json = JSON.parse(response.data);
    // console.log(response.data.data);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    // console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

export const deletePosts = async (post, user) => {
  setHeaders();
  try {
    const response = await axios.delete(`${rootURL}/posts/${post.id}`);
    // const json = JSON.parse(response.data);
    console.log(user.postCount);
    await axios.put(`${rootURL}/currentUser/`, [{
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      following: user.following,
      followers: user.followers,
      postCount: user.postCount - 1,
      suggested: user.suggested,
    }]);
    // check the user associated with the post that is being deleted
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const resetCurrentUser = async () => {
  setHeaders();
  try {
    // add the token to the header
    setHeaders();
    const response = await axios.delete(`${rootURL}/currentUser/`);
    // const json = JSON.parse(response.data.data);
    // console.log(response.data.postCount);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const editCaption = async (post, newCap) => {
  setHeaders();
  try {
    // const json = JSON.parse(response.data);
    const response = await axios.put(`${rootURL}/posts`, {
      id: post.id,
      userId: post.userId,
      author: post.author,
      caption: newCap,
    });
    // check the user associated with the post that is being deleted
    return response.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const getUserByEmail = async (userEmail) => {
  try {
    // add the token to the header
    setHeaders();
    const response = await axios.get(`${rootURL}/user/email/${userEmail}`);
    console.log('++++++++++this is line 349 in mock_api.js');
    console.log(response.data.data);
    return response.data.data;
    // const userList = response.data.data;
    // const user = userList.find((t) => t.email === userEmail);
    // if (!user) {
    //   return false;
    // }
    // return user;
  } catch (err) {
    // console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

export const updatePassword = async (userID, newPassword) => {
  setHeaders();
  try {
    // add the token to the header
    setHeaders();
    const response = await axios.put(
      `${rootURL}/user/${userID}`,
      `password=${newPassword}`,
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

export const getComments = async () => {
  setHeaders();
  try {
    const response = await axios.get(`${rootURL}/comments/`);
    return response.data.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const getAComment = async (commentId) => {
  setHeaders();
  try {
    const response = await axios.get(`${rootURL}/comments/${commentId}`);
    return response.data.data;
  } catch (err) {
    // console.error(err);
  }
  return false;
};
export const addCommentToPost = async (commentId, postId) => {
  setHeaders();
  try {
    const post = await getAPost(postId);
    post.comments.push(commentId);
    // add commentId to post
    const response = await axios.put(
      `${rootURL}/posts/${postId}/comments/`,
      (post),
    );
    return (response.data.data);
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
  }
  return false;
};

export const createComment = async (userID, comment) => {
  setHeaders();
  try {
    const response = await axios.post(
      `${rootURL}/comments`,
      `userId=${userID}&content=${comment}`,
    );
    // );
    // console.log(response.data.data);
    return (response.data.data);
    // return the data with the id of the student
  } catch (err) {
    // console.error(err);
    // reAuthenticate(401);
  }
  return false;
};

/**
 * sends a login request to the backend
 */
export const setLogin = async (email) => {
  try {
    const response = await axios.post(`${rootURL}/login`, `email=${email}`);
    // store the token
    sessionStorage.setItem('app-token', response.data.token);
    console.log('at login');
    console.log(response.data.token);
    return response.data.token;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const setLogout = async (email) => {
  try {
    const response = await axios.delete(`${rootURL}/login/`, { data: { email: `${email}` } });
    reAuthenticate(401);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const setAccountOnHold = async (userId) => {
  try {
    const response = await axios.post(`${rootURL}/hold/${userId}`, `_id=${userId}`, `time=${Date.now()}`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.err(err);
  }
  return null;
};

export const getAccountOnHold = async (userId) => {
  try {
    const response = await axios.get(`${rootURL}/hold/`);
    const accountList = response.data.data;
    const user = accountList.find((t) => t._id === userId);
    if (!user || user.length < 1) {
      return false;
    }
    // return false if user not found
    if (!response) {
      return false;
    }
    // return timestamp if user found
    // console.log(response.data.data);
    return user;
  } catch (err) {
    return false;
  }
};

export const deleteAccountOnHold = async (userId) => {
  try {
    const response = await axios.delete(`${rootURL}/hold/${userId}`);
    // if user not found then return false
    if (!response) {
      return false;
    }
    return response.data.data;
  } catch (err) {
    return false;
  }
};
