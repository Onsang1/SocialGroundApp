import axios from 'axios';

const rootURL = 'http://localhost:8000';



export const createFollow = async (follower, following) => {
  try {
    const response = await axios.post(
      `${rootURL}/follow`,{
        follower: follower,
        following: following
        });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteFollow = async (id) => {
  try {
    await axios.delete(`${rootURL}/follow/${id}` 
    )
    
    console.log("unfollow completed");
  } catch (err) {
    console.error (err);
  }
};