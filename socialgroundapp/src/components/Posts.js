import PropTypes from 'prop-types';
import React from 'react';
import Post from './Post';

function Posts({ posts, current }) {
  return (
    <div id="posts">
      {posts.map((post) => (
        <article className="post-box" key={post.id}>
          <Post post={post} current={current} />
        </article>
      ))}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.number),
  }).isRequired).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    suggested: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default Posts;
