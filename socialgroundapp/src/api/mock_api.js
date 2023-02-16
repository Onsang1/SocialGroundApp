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
    return response.data;
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

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${rootURL}/currentUser`);
    return response.data['0'];
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
    // console.log(response);
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

export const updateLike = async (currentUser, post, action) => {
  try {
    switch (action) {
      case 'like': {
        console.log('currentuser id', currentUser.id);
        post.likes.push(currentUser.id);
        console.log('like list:', post);
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

// post the base64 of selected photo to json-server
export const createPost = async (file, postInfo, user) => {
  try {
    const reader = new FileReader();
    await axios.put(`${rootURL}/currentUser/${user.id}`, {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      following: user.following,
      followers: user.followers,
      postCount: user.postCount + 1,
      suggested: user.suggested,
    });

    reader.onloadend = async function onloadend() {
      const response = await axios.post(`${rootURL}/posts`, {
        caption: postInfo.caption,
        body: reader.result,
        author: user.username,
        userId: user.id,
        id: Math.floor(Math.random() * 1000),
      });
      // const currentPostCount = user.postCount;
      return response.data;
    };

    await reader.readAsDataURL(file);
  } catch (err) {
    console.error(err);
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
    // console.error(err);
  }
  return false;
};

export const deletePosts = async (post, user) => {
  try {
    const response = await axios.delete(`${rootURL}/posts/${post.id}`);
    // const json = JSON.parse(response.data);
    console.log(user.postCount);
    await axios.put(`${rootURL}/currentUser/`, [{
      id: user.id,
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
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return false;
};

// export const editCaption = async (post, newCap) => {
//   try {
//     // const json = JSON.parse(response.data);
//     await axios.put(`${rootURL}/posts`, {
//       id: post.id,
//       userId: post.userId,
//       author: post.author,
//       caption: newCap,
//     });
//     // check the user associated with the post that is being deleted
//     return response.data;
//   } catch (err) {
//     // console.error(err);
//   }
//   return false;
// };
