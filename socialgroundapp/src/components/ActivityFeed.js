import React from 'react';
import '../style/Feed.css';
import Navbar from './Navbar';
import Posts from './Posts';
import {
  getUsers, getComments, getPosts, getCurrentUser,
} from '../api/mock_api';

async function Feed() {
  const { error, isLoading, data: posts } = await getPosts();
  const { data: comments } = await getComments();
  const { data: users } = await getUsers();
  const { data: currentUser } = await getCurrentUser();
  // console.log('in feed');
  // console.log(currentUser);
  // console.log(posts);
  // console.log(users);
  // console.log(comments);
  // console.log('end feed');
  return (

    <div className="Feed">
      <Navbar />
      <section>

        { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> }
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

  );
}

export default Feed;
