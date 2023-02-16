import React, { useEffect, useState } from 'react';
import '../style/Feed.css';
import Navbar from './Navbar';
import Posts from './Posts';
import Welcome from './Welcome';
import {
  getUsers, getComments, getPosts, getUser,
} from '../api/mock_api';

function Feed() {
  const [users, setUsers] = useState();
  const [comments, setComments] = useState();
  const [posts, setPosts] = useState();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await getPosts();
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
        <Navbar current={currentUser} />
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
