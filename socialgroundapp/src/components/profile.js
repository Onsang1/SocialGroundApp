import React, { useState } from 'react';
import '../css/profile.css';
import { Link } from 'react-router-dom';
import userLogo from '../images/user_icon.png';
import smallLogo from '../socialground_small.png';
import circledPlus from '../images/circled_plus.jpg';
import { getPosts } from '../api/mock_api';

const profile = () => {
  // using state to save image[
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');
  const [image7, setImage7] = useState('');
  const [image8, setImage8] = useState('');
  const [image9, setImage9] = useState('');

  // https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
  // function loadImage() {
  //   const xmlhttp = new XMLHttpRequest();
  //   xmlhttp.onreadystatechange = () => {
  //     if (xmlhttp.readyState === 4) {
  //       // update image state after fetching is done
  //       const json = JSON.parse(xmlhttp.response);
  //       setBase(json.content);
  //     }
  //   };
  async function loadImage() {
    const posts = await getPosts();
    setImage1(posts[0].content);
    setImage2(posts[1].content);
    setImage3(posts[2].content);
    setImage4(posts[3].content);
    setImage5(posts[4].content);
    setImage6(posts[5].content);
    setImage7(posts[6].content);
    setImage8(posts[7].content);
    setImage9(posts[8].content);
  }

  loadImage();

  return (
    <div id="react-root">
      <div aria-disabled="false" role="button">
        <Link to="/feed">
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
        <span className="profile-username">Username</span>
        <span className="posts">Posts</span>
        <span className="followers">Followers</span>
        <span className="following">Following</span>
        <span className="posts-count">0</span>
        <span className="followers-count">0</span>
        <span className="following-count">0</span>
        <div className="boxes">
          <div className="box1">
            <img src={image1} alt="" width="100%" height="100%" />
          </div>
          <div className="box2">
            <img src={image2} alt="" width="100%" height="100%" />
          </div>
          <div className="box3">
            <img src={image3} alt="" width="100%" height="100%" />
          </div>
          <div className="box4">
            <img src={image4} alt="" width="100%" height="100%" />
          </div>
          <div className="box5">
            <img src={image5} alt="" width="100%" height="100%" />
          </div>
          <div className="box6">
            <img src={image6} alt="" width="100%" height="100%" />
          </div>
          <div className="box7">
            <img src={image7} alt="" width="100%" height="100%" />
          </div>
          <div className="box8">
            <img src={image8} alt="" width="100%" height="100%" />
          </div>
          <div className="box9">
            <img src={image9} alt="" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
