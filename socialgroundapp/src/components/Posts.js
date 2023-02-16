import PropTypes from 'prop-types';
import React from 'react';
import Post from './Post';

function Posts({
  posts, comments, current, users,
}) {
  console.log(posts);
  console.log(comments);
  console.log(current);
  console.log(users);
  return (
    <div id="posts">
      {posts.map((post) => (
        <article className="post-box" key={post.id}>
          <Post post={post} comments={comments} current={current} users={users} />
        </article>
      ))}
    </div>
  );
}
Posts.defaultProps = {
  current: null,
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.number),
  }).isRequired).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    postId: PropTypes.string.isRequired,
    content: PropTypes.string,
    id: PropTypes.number.isRequired,
  })).isRequired,
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    suggested: PropTypes.arrayOf(PropTypes.number),
  }),
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    postCount: PropTypes.number,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default Posts;
