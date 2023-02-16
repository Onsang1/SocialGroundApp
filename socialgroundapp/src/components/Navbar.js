import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import smallLogo from '../socialground_small.png';
import search from '../icons/search.png';
import logout from '../icons/logout_icon.png';
import plussign from '../icons/plussign.png';
import userProfile from '../icons/userProfile.png';
import { resetCurrentUser } from '../api/mock_api';

function Navbar() {
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    e.preventDefault();
    resetCurrentUser();
    navigate('/');
  };
  return (
    <nav className="navbar">
      <div className="left-section-feed">
        <Link to="/feed">
          <img src={smallLogo} className="small-logo" alt="social ground logo " />
        </Link>
      </div>
      <div className="right-section-feed">
        <div className="logout-area">
          <button className="logout-btn" type="button" onClick={handleOnClick}>
            <img src={logout} className="logout-icon" alt="logout icon" />
          </button>
        </div>
        <div className="search-icon-area">
          <Link to="/Find" state={{ listType: 'suggestion' }}>
            <button className="icon-btn" type="button">
              <img src={search} className="search-icon" alt="search icon" />
            </button>
          </Link>
        </div>
        <div className="plus-sign-area">
          <Link to="/upload">
            <button className="plus-btn" type="button">
              <img src={plussign} className="plus-sign-icon" alt="plus sign icon" />
            </button>
          </Link>
        </div>
        <div className="profile-icon-area">
          <Link to="/profile">
            <button className="profile-btn" type="button">
              <img src={userProfile} className="profile-icon" alt="profile-icon" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
