/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
// import flowers from '../images/flowers.png';
import heart from '../icons/heart.png';
import books from '../images/books.jpeg';
import comments from '../icons/comments.png';
import deleteIcon from '../icons/delete.png';
import editIcon from '../icons/edit.png';
import Comments from './Comment';
// import useStyles from '../style/PostStyles';
import CreateComment from './Create';
import { deletePosts } from '../api/mock_api';

export default function Post(props) {
  const navigate = useNavigate();
  const { author } = props.post;
  const { caption } = props.post;
  // const { body } = props.post;
  // const classes = useStyles();
  function handleDelete(e) {
    deletePosts(e);
    setTimeout(navigate('/profile'), 8000);
  }

  return (
    <div className="post">
      <div className="profile-info">
        <div className="profile-area">
          <Avatar
            src={books}
            alt="User"
            // sx={{ marginLeft: 5, marginRight: 10, paddingLeft: 3 }}
          />
        </div>
        {/* <Link to={`../profile/${props.post.userId}`} className="username"> */}
        <Link to="../profile" className="username">
          {author}
        </Link>
        <button type="button" id="deletePostButton" onClick={() => handleDelete(props.post)}>
          <img src={deleteIcon} id="deleteButton" alt="deleteButton" />
        </button>
        <button type="button" id="editPostButton">
          <img src={editIcon} id="editButton" alt="editButton" />
        </button>
      </div>
      <div className="postArea">
        <img src={props.post.body} className="post-image" alt="flower pic" />
      </div>
      <div className="likeArea">
        <div className="like-box">
          <img src={heart} className="like-icon" alt="like-icon" />
        </div>
        <div className="comment-box">
          <img src={comments} className="comment-icon" alt="like-icon" />
        </div>
      </div>
      <br />
      <div className="captionArea">
        <Link to={`users/${props.post.userId}`} className="username">{author}</Link>
        <p className="caption">
          {' '}
          {caption}
          {' '}
        </p>
      </div>
      <div className="numComments">
        <Comments />
      </div>
      {' '}
      <br />
      <div className="bottom">
        <CreateComment postId={props.post.id} />
      </div>
    </div>
  );
}
