import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { updateLike } from '../api/mock_api';

function Like({ post, current }) {
  const [LikeStatus, setLikeStatus] = useState(false);
  const handleOnClick = async (e) => {
    e.preventDefault();
    const action = LikeStatus === false ? 'like' : 'unlike';

    await updateLike(current, post, action);
    setLikeStatus(!LikeStatus);
  };

  return (
    <IconButton onClick={handleOnClick}>
      {LikeStatus ? <FavoriteIcon color="inherited" sx={{ fontSize: 30 }} />
        : <FavoriteBorderIcon sx={{ fontSize: 30 }} color="inherited" />}
    </IconButton>
  );
}

Like.propTypes = {
  post: PropTypes.shape({
    caption: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  current: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    suggested: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default Like;
