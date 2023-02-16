import React, {useState, useEffect} from 'react';
import large_logo from "../socialground_large.png";
import "../style/FindFriends.css";
import TextField from "@mui/material/TextField";
import List from './List';
import { Link } from 'react-router-dom';
import useFetch from "../fetcher/useFetch";


function Find() {

  const [inputUsername, setUsername] = useState('');
  const currentUser = 'xinyuesh'
  const { data: users } = useFetch('http://localhost:8000/users');
  const { data: follows } = useFetch('http://localhost:8000/follow');

  const handleOnChange = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setUsername(lowerCase);
  };

  return (
      <div className="Find-Page">
        <div className="logo-area">
          <Link to='/Feed'>
            <button className="logo-button">
              <img src={large_logo} className='large-logo' alt='large_logo' />
            </button>   
          </Link>      
        </div>
        <h3 className="FindMessage">
              Find Friends on Social Ground
        </h3>
        <div className="search-area">
          <TextField
            id="outlined-basic"
            onChange={handleOnChange}
            variant="outlined"
            fullWidth
            label="Search"
            placeholder='Enter username'
          />
        </div>
        {users && <List input={inputUsername} current={currentUser} users = {users} follows = {follows}/>}
        
      </div>

  );
}


export default Find;