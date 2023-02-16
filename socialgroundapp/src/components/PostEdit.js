import React from 'react';
import '../style/Feed.css';
import { useLocation } from 'react-router-dom';
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Navbar from './Navbar';
import Post from './Post';

function PostEdit() {
  const location = useLocation();
  const { post } = location.state;
  return (

    <div className="Feed">
      <Navbar />
      <section>
        <article className="post-box" key={post.id}>
          {post && <Post post={location.state.post} />}
        </article>
      </section>
    </div>

  );
}

export default PostEdit;
