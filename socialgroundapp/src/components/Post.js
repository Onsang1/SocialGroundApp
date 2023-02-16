import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
import books from '../images/books.jpeg';
import deleteIcon from '../icons/delete.png';
import editIcon from '../icons/edit.png';
import Comments from './Comment';
import CreateComment from './Create';
import { deletePosts, getCurrentUser } from '../api/mock_api';
import Like from './Likes';

function Post({ post, current }) {
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
          <button type="button" id="editPostButton">
            <img src={editIcon} id="editButton" alt="editButton" />
          </button>
          <button type="button" id="deletePostButton" onClick={() => handleDelete(post)}>
            <img src={deleteIcon} id="deleteButton" alt="deleteButton" />
          </button>
        </div>
      </div>
      <div className="postArea">
        <img src={post.body} className="post-image" alt="flower pic" />
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
        <Comments />
      </div>
      {' '}
      <br />
      <div className="bottom">
        <CreateComment postId={post.id} />
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    caption: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
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

export default Post;
