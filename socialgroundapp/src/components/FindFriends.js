import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import largeLogo from '../socialground_large.png';
import '../style/FindFriends.css';
import Loading from './Loading';
import List from './List';
import Return from '../icons/return.png';
import { getCurrentUser, getUsers } from '../api/mock_api';

function Find() {
  const [inputUsername, setUsername] = useState('');
  const [users, setUsers] = useState('');
  const [currentUser, setCurr] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };
    const fetchCurrData = async () => {
      const currentUserData = await getCurrentUser();
      setCurr(currentUserData);
    };
    fetchUserData()
      .catch(console.error);
    fetchCurrData()
      .catch(console.error);
  }, []);
  const location = useLocation();
  while (location.state === undefined) {
    Find();
  }
  while (location.state === null) {
    Find();
  }
  const { listType } = location.state;
  function listTypeMessage() {
    if (listType === 'suggestion') {
      return 'Find Friends on Social Ground';
    } if (listType === 'followers') {
      return 'Meet all your followers!';
    } if (listType === 'following') {
      return 'See who you are following!';
    }
    return null;
  }

  function suggestionText() {
    if (listType === 'suggestion') {
      return 'Suggestions';
    } if (listType === 'followers') {
      return 'All Followers';
    }
    return '';
  }

  const handleOnChange = (e) => {
    // console.log('e.target: ', e.target);
    // console.log('e.target.value', e.target.value);
    const lowerCase = e.target.value.toLowerCase();
    setUsername(lowerCase);
  };

  const [redirectFlag, setRedirectFlag] = useState(false);
  setTimeout(() => setRedirectFlag(true), 2050);
  return redirectFlag
    ? (
  // return (
      <div className="Find-Page">
        <Link to="/Feed">
          <button className="logo-button" type="button">
            <img src={Return} className="return-key" alt="return-key" id="return" />
          </button>
        </Link>
        <div className="logo-area">
          <Link to="/Feed">
            <button className="logo-button" type="button">
              <img src={largeLogo} className="large-logo" alt="large_logo" />
            </button>
          </Link>
        </div>
        <h3 className="FindMessage" id="FindMessage">
          {listTypeMessage()}
        </h3>
        <div className="search-area">
          <TextField
            id="outlined-basic"
            onChange={handleOnChange}
            variant="outlined"
            fullWidth
            label="Search"
            placeholder="Enter username"
          />
        </div>
        {!inputUsername && <p className="suggestedText" id="suggestedText">{suggestionText()}</p>}
        {users && (
        <List
          input={inputUsername}
          current={currentUser}
          users={users}
          listType={listType}
        />
        )}

      </div>

    ) : <Loading />;
}

export default Find;
