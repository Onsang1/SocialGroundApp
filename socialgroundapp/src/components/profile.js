import React, { useState } from 'react';
import './css/profile.css';
import { Link } from 'react-router-dom';
import userLogo from './images/user_icon.png';
import smallLogo from './socialground_small.png';
import circledPlus from './images/circled_plus.jpg';

const profile = () => {
  // using state to save image
  const [base64, setBase] = useState('');
  // https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
  function loadImage() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        // update image state after fetching is done
        const json = JSON.parse(xmlhttp.response);
        setBase(json.content);
      }
    };

    // fetch image from json server
    const url = 'http://localhost:3005/posts/235';
    xmlhttp.open('GET', url);
    xmlhttp.send();
  }

  loadImage();

  return (
    <div id="react-root">
      <div aria-disabled="false" role="button">
        <Link to="/Feed">
          <img src={smallLogo} className="sg-logo-small" alt="sg-logo-small" />
        </Link>
      </div>
      <div className="main-body">
        <div aria-disabled="false" role="button">
          <img src={userLogo} className="user-logo" alt="user-logo" />
        </div>
        <div aria-disabled="false" role="button">
          <Link to="/upload">
            <img src={circledPlus} className="circled-plus" alt="circled-plus" />
          </Link>
        </div>
        <span className="username">Username</span>
        <span className="posts">Posts</span>
        <span className="followers">Followers</span>
        <span className="following">Following</span>
        <span className="posts-count">0</span>
        <span className="followers-count">0</span>
        <span className="following-count">0</span>
        <div className="boxes">
          <div className="box1">
            <img src={base64} alt="" width="450" height="450" />
          </div>
          <div className="box2" />
          <div className="box3" />
          <div className="box4" />
          <div className="box5" />
          <div className="box6" />
          <div className="box7" />
          <div className="box8" />
          <div className="box9" />
        </div>
      </div>
    </div>
  );
};

export default profile;

// function loadProfilePage() {
//     return (
//       <div id="react-root">
//         <div aria-disabled="false" role="text">
//           <img src={smallLogo} className="sg-logo-small" alt="sg-logo-small" />
//         </div>
//         <div className="main-body">
//           <div aria-disabled="false" role="text">
//             <img src={userLogo} className="user-logo" alt="user-logo" />
//           </div>
//           <div aria-disabled="false" role="text">
//             <img src={circledPlus} className="circled-plus" alt="circled-plus" />
//           </div>
//           <span className="username">Username</span>
//           <span className="posts">Posts</span>
//           <span className="followers">Followers</span>
//           <span className="following">Following</span>
//           <span className="posts-count">0</span>
//           <span className="followers-count">0</span>
//           <span className="following-count">0</span>
//           <div className="boxes">
//             <div className="box1"></div>
//             <div className="box2"></div>
//             <div className="box3"></div>
//             <div className="box4"></div>
//             <div className="box5"></div>
//             <div className="box6"></div>
//             <div className="box7"></div>
//             <div className="box8"></div>
//             <div className="box9"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }
