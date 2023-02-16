/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import flowers from '../images/flowers.png';
import heart from '../icons/heart.png';
import books from '../images/books.jpeg';
import comments from '../icons/comments.png';
import Comments from './Comment';
// import useStyles from '../style/PostStyles';
import CreateComment from './Create';

function Post(props) {
  const { author } = props.post;
  const { caption } = props.post;
  // const { body } = props.post;
  // const classes = useStyles();

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
        <Link to={`users/${props.post.userId}`} className="username">
          {author}
        </Link>
      </div>
      <div className="postArea">
        <img src={flowers} className="post-image" alt="flower pic" />
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

export default Post;
