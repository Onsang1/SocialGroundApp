/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
import books from '../images/books.jpeg';
import deleteIcon from '../icons/delete.png';
import editIcon from '../icons/edit.png';
import Comments from './Comments';
import CreateComment from './Create';
import { deletePosts, getCurrentUser } from '../api/mock_api';
import Like from './Likes';

function Post({
  post, comments, current, users,
}) {
  console.log('++++++++++++++++post prop in Post.js is');
  console.log(post);
  console.log(comments);
  console.log(current);
  const [hidden, setHidden] = useState();
  setHidden(post._id === current._id ? '' : 'hidden');
  const navigate = useNavigate();
  async function handleDelete(e) {
    const user = await getCurrentUser();
    deletePosts(e, user);
    setTimeout(navigate('/profile'), 8000);
  }
  return (
    <div className="post">
      <div className="profile-info">
        <div className="profile-area">
          <Avatar
            src={books}
            alt="User"
          />
        </div>
        <Link to="../profile" className="username">
          {post.author}
        </Link>
        <div className="post-top-right-section">
          <Link to="/caption">
            <button type="button" id="editPostButton">
              <img src={editIcon} id="editButton" alt="editButton" />
            </button>
          </Link>
          <button type="button" id="deletePostButton" onClick={() => handleDelete(post)} hidden={hidden}>
            <img src={deleteIcon} id="deleteButton" alt="deleteButton" />
          </button>
        </div>
      </div>
      <div className="postArea">
        <img src={post.content} className="post-image" alt="pic" />
      </div>
      <div className="likeArea">
        <div className="like-box">
          <Like post={post} current={current} />
        </div>
        <div className="comment-box">
          <IconButton>
            <CommentIcon sx={{ fontSize: 30 }} color="inherited" />
          </IconButton>
        </div>
      </div>
      <br />
      <div className="captionArea">
        <Link to={`users/${post.userId}`} className="username">{post.author}</Link>
        <p className="caption">
          {' '}
          {post.caption}
          {' '}
        </p>
      </div>
      <div className="numComments">
        <Comments commentID={post.comments} comments={comments} users={users} />
      </div>
      {' '}
      <br />
      <div className="bottom">
        <CreateComment postId={post._id} users={users} />
      </div>
    </div>
  );
}

Post.defaultProps = {
  current: null,
  comments: null,
};

Post.propTypes = {
  post: PropTypes.shape({
    caption: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    comments: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  })),
  current: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    followers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    suggested: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  }),
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    postCount: PropTypes.number,
    _id: PropTypes.string.isRequired,
  })).isRequired,
};

export default Post;
