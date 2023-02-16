import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import flowers from "../images/flowers.png"
import heart from "../icons/heart.png"
import comments from "../icons/comments.png"
import Comments from './Comment';
import { Avatar} from '@material-ui/core';
import useStyles from '../style/PostStyles';
import CreateComment from './Create';

const Post = (props) => {
  const author = props.post.author;
  const caption = props.post.caption;
  const body = props.post.body;
  const classes = useStyles();

  
  return (
    <div className="post">
      <div className="profile-info">
        <div className="profile-area">
          <Avatar className={classes.profile} src="https://source.unsplash.com/random" alt="User" />
        </div>
        <Link to= {`users/${props.post.userId}`} className="username">
          {author}
        </Link>
      </div>
      <div className="postArea">
        <img src= {flowers} className = "post-image" alt = "flower pic" />
      </div>
      <div className="likeArea">
        <div className="like-box">
          <img src= {heart} className = "like-icon" alt = "like-icon" />
        </div>
        <div className="comment-box">
          <img src= {comments} className = "comment-icon" alt = "like-icon" />
        </div>  
      </div><br></br>
      <div className="captionArea">
        <Link to= {`users/${props.post.userId}`} className="username">{author}</Link>
        <p className="caption"> {caption} </p>
      </div>
      <div className="numComments"> 
        <Comments/>
      </div> <br></br>
      <div className="bottom">
        <CreateComment postId= {props.post.id}/>
      </div>
    </div>
  )
}

export default Post