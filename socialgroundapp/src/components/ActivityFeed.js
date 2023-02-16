import React from 'react';
import '../style/Feed.css';
import Navbar from './Navbar';
import Posts from './Posts';
import useFetch from '../fetcher/useFetch';

function Feed() {
  const { error, isLoading, data: posts } = useFetch('http://localhost:8080/posts');
  const { data: comments } = useFetch('http://localhost:8080/comments');
  const { data: users } = useFetch('http://localhost:8080/users');
  const { data: currentUser } = useFetch('http://localhost:8080/currentUser/');

  return (

    <div className="Feed">
      <Navbar />
      <section>

        { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> }
        { posts && (
        <Posts
          posts={posts.data}
          users={users.data}
          comments={comments.data}
          current={currentUser.data}
        />
        ) }
      </section>
    </div>

  );
}

export default Feed;
