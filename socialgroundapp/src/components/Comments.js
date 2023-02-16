import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function Comments({ commentID, comments, users }) {
  const commentList = comments.filter((obj) => commentID.includes(obj.id));

  return (
    <div id="postComments">
      {commentList.map((cID) => (
        <article className="comment-lists">
          <Comment commentObj={cID} users={users} />
        </article>
      ))}
    </div>
  );
}

Comments.defaultProps = {
  commentID: null,
};

Comments.propTypes = {
  commentID: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
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
export default Comments;
