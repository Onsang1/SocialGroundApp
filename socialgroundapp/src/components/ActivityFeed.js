import React, { useEffect, useState } from 'react';
import '../style/Feed.css';
import Navbar from './Navbar';
import Posts from './Posts';
import Welcome from './Welcome';
import {
  getUsers, getComments, getPosts, getUser, getPostByUser,
} from '../api/mock_api';

function Feed() {
  const [users, setUsers] = useState();
  const [comments, setComments] = useState();
  const [posts, setPosts] = useState();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchPostData = async () => {
      // const postData = await getPosts();
      const postData = [];
      const currentUserData = await getUser(sessionStorage.getItem('user').slice(1, -1));
      let i;
      let j;
      for (i = 0; i < currentUserData.following.length; i += 1) {
        const postToShow = await getPostByUser(currentUserData.following[i]);
        for(j = 0; j < postToShow.length; j += 1){
          // console.log("the boolean in feed is +++++++++++++++++");
          // // console.log(sessionStorage.getItem('user').slice(1, -1));
          // console.log(postToShow[j].hidden);
          // console.log(postToShow[j].hidden.includes(sessionStorage.getItem('user').slice(1, -1)));

          // console.log(postToShow.hidden.include(sessionStorage.getItem('user').slice(1, -1)));
          if(!postToShow[j].hidden.includes(sessionStorage.getItem('user').slice(1, -1))){
          postData.push(postToShow[j]);
          }
        }
      }
      console.log('++++++++++++++++++');
      console.log(postData);

      setPosts(postData);
    };
    const fetchUserData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };
    const fetchCommentData = async () => {
      const commentData = await getComments();
      setComments(commentData);
    };
    const fetchCurrData = async () => {
      const currentUserData = await getUser(sessionStorage.getItem('user').slice(1, -1));
      setCurrentUser(currentUserData);
    };

    fetchPostData()
      .catch(console.error);
    fetchUserData()
      .catch(console.error);
    fetchCommentData()
      .catch(console.error);
    fetchCurrData()
      .catch(console.error);
  }, []);
  console.log(`currentUser in feed: ${currentUser}`);
  const [redirectFlag, setRedirectFlag] = useState(false);
  setTimeout(() => setRedirectFlag(true), 3000);
  return redirectFlag
    ? (
      <div className="Feed">
        <Navbar current={currentUser} users = {users}/>
        <section>

          {/* { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> } */}
          { posts && (
          <Posts
            posts={posts}
            users={users}
            comments={comments}
            current={currentUser}
          />
          ) }
        </section>
      </div>

    ) : <Welcome />;
}

export default Feed;
