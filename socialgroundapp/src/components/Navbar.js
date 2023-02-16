import { Link } from 'react-router-dom';
import React from 'react';
import smallLogo from '../socialground_small.png';
import search from '../icons/search.png';
import plussign from '../icons/plussign.png';
import userProfile from '../icons/userProfile.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-section-feed">
        <img src={smallLogo} className="small-logo" alt="social ground logo " />
      </div>
      <div className="right-section-feed">
        <div className="search-icon-area">
          <Link to="/Find">
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
