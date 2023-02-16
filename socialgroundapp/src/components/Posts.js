/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React from 'react';
import Post from './Post';

function Posts({ posts }) {
  return (
    <div id="posts">
      {posts.map((post) => (
        <article className="post-box" key={post.id}>
          <Post post={post} />
        </article>
      ))}
    </div>
  );
}

// Posts.propTypes = {
//   posts: PropTypes.string.isRequired,
// };

export default Posts;
