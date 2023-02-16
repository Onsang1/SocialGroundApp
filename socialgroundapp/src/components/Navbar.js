import { Link } from "react-router-dom";
import React from "react";
import small_logo from "../socialground_small.png";
import search from "../icons/search.png"
import plussign from  "../icons/plussign.png"
import userProfile from "../icons/userProfile.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-section-feed">
        <img src={small_logo} className="small-logo" alt="social ground logo " />
      </div>
      <div className="right-section-feed">
        <div className="search-icon-area">
          <Link to="/Find">
            <button  className="icon-btn">
              <img src={search} className="search-icon" alt = "search icon" />
            </button>
          </Link>
        </div>
        <div className="plus-sign-area">
          <Link to ="/upload">
            <button className="plus-btn">
              <img src={plussign} className="plus-sign-icon" alt = "plus sign icon" />
            </button>
          </Link>
        </div>
        <div className="profile-icon-area">
          <Link to ="/profile">
            <button className="profile-btn">
              <img src={userProfile} className="profile-icon" alt = "profile-icon" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;



