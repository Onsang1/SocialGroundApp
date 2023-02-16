import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import largeLogo from '../socialground_large.png';
import '../style/FindFriends.css';

import List from './List';

import useFetch from '../fetcher/useFetch';

function Find() {
  const [inputUsername, setUsername] = useState('');
  const { data: currentUser } = useFetch('http://localhost:8000/currentUser/1');
  const { data: users } = useFetch('http://localhost:8000/users');
  const { data: follows } = useFetch('http://localhost:8000/follow');
  const location = useLocation();
  const { listType } = location.state;
  function listTypeMessage() {
    if (listType === 'suggestion') {
      return 'Find Friends on Social';
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
    const lowerCase = e.target.value.toLowerCase();
    setUsername(lowerCase);
  };

  return (
    <div className="Find-Page">
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
        follows={follows}
        listType={listType}
      />
      )}

    </div>

  );
}

export default Find;
