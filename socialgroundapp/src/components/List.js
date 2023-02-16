/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import userProfile from '../icons/userProfile.png';
import { updateFollow } from '../api/mock_api';

function Follow(props) {
  const [FollowStatus, setFollowStatus] = useState(false);
  // const followingList = {props.follower.followling};
  // TO DO: fetch actual follow entry ID from db
  const handleOnClick = async (e) => {
    // TO DO:  link item.id
    e.preventDefault();
    const action = FollowStatus === false ? 'follow' : 'unfollow';
    await updateFollow(props.follower, props.following, action);
    setFollowStatus(!FollowStatus);
  };

  return (
    <button className="submit-button" type="submit" onClick={handleOnClick}>
      <div className="button-label">
        {/* {' '} */}
        {FollowStatus ? 'Unfollow' : 'Follow'}
      </div>
    </button>
  );
}

function List(props) {
  const { listType } = props;
  let data = '';
  if (listType === 'suggestion') {
    const suggested = props.users.filter((el) => {
      if (props.current.suggested.includes(el.id)) {
        return el;
      }
      return null;
    });
    const filteredData = props.users.filter((el) => {
    // if no input the return the original
      if (props.input === '') {
        return el;
      } // return the item which contains the user input
      return el.username.toLowerCase().includes(props.input);
    });
    data = (props.input === '') ? suggested : filteredData;
  } else if (listType === 'followers') {
    const followers = props.users.filter((el) => {
      if (props.current.followers.includes(el.id)) {
        return el;
      }
      return null;
    });
    data = followers;
  } else if (listType === 'following') {
    const following = props.users.filter((el) => {
      if (props.current.following.includes(el.id)) {
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
                {/* {' '} */}
                {user.username}
              </p>
            </div>
            <div className="right">
              <Follow
                following={user}
                follower={props.current}
                follow={props.follows}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>

  );
}

export default List;
