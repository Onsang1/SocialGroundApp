import React, { useState } from 'react';
import PropTypes from 'prop-types';
import userProfile from '../icons/userProfile.png';
import { updateFollow } from '../api/mock_api';

function Follow({ follower, following }) {
  const [FollowStatus, setFollowStatus] = useState(false);
  const handleOnClick = async (e) => {
    e.preventDefault();
    const action = FollowStatus === false ? 'follow' : 'unfollow';
    await updateFollow(follower, following, action);
    setFollowStatus(!FollowStatus);
  };

  return (
    <button className="submit-button-find" type="submit" onClick={handleOnClick}>
      <div className="button-label">
        {FollowStatus ? 'Unfollow' : 'Follow'}
      </div>
    </button>
  );
}

function List({
  listType, current, users, input,
}) {
  let data = '';
  if (listType === 'suggestion') {
    const suggested = users.filter((el) => {
      if (current.suggested?.includes(el.id)) {
        return el;
      }
      return null;
    });
    const filteredData = users.filter((el) => {
    // if no input the return the original
      if (input === '') {
        return el;
      } // return the item which contains the user input
      return el.username.toLowerCase().includes(input);
    });
    data = (input === '') ? suggested : filteredData;
  } else if (listType === 'followers') {
    const followers = users.filter((el) => {
      if (current.followers?.includes(el.id)) {
        return el;
      }
      return null;
    });
    data = followers;
  } else if (listType === 'following') {
    const following = users.filter((el) => {
      if (current.following?.includes(el.id)) {
        return el;
      }
      return null;
    });
    data = following;
  }
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <div className="user-info-area">
            <div className="left">
              <img src={userProfile} className="profile-icon" alt="" />
            </div>
            <div className="middle">
              <p className="username">
                {user.username}
              </p>
            </div>
            <div className="right">
              <Follow
                following={user}
                follower={current}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>

  );
}

Follow.propTypes = {
  follower: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    suggested: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  following: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    suggested: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

List.propTypes = {
  input: PropTypes.string.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    suggested: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    postCount: PropTypes.number,
  }).isRequired).isRequired,
  listType: PropTypes.string.isRequired,
  follower: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    suggested: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  following: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.number),
    followers: PropTypes.arrayOf(PropTypes.number),
    suggested: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default List;
