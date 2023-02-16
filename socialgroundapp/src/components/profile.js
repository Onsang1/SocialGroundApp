import React, { useRef, useEffect, useState } from 'react';
import '../css/profile.css';
import { Link } from 'react-router-dom';
import setting from '../icons/settings.png';
import defaultUser from '../icons/default_user.png';
import smallLogo from '../socialground_small.png';
import circledPlus from '../images/circled_plus.jpg';
import { getUser, getPosts } from '../api/mock_api';

const profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(1).then((res) => {
      // console.log(res);
      setUser(res);
    });
  }, []);

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

  const firstRendering = useRef(true);

  async function loadImage() {
    if (!firstRendering) {
      return;
    }
    const posts = await getPosts();
    setImage1(posts[0]);
    setImage2(posts[1]);
    setImage3(posts[2]);
    setImage4(posts[3]);
    setImage5(posts[4]);
    setImage6(posts[5]);
    setImage7(posts[6]);
    setImage8(posts[7]);
    setImage9(posts[8]);
    // console.log(image3);
    firstRendering.current = false;
  }
  if (firstRendering.current) {
    firstRendering.current = false;
    loadImage();
  }

  // const handleOnClick = (e) => {
  //   navigate(`/post/${e}`);
  // };

  return (
    <div id="react-root">
      <div aria-disabled="false" role="button">
        <Link to="/feed">
          <img src={smallLogo} className="sg-logo-small" alt="sg-logo-small" />
        </Link>
      </div>
      <div className="main-body">
        <div className="profile-bar">
          <div aria-disabled="false" role="button">
            <img src={defaultUser} className="default-user" alt="default-user" placeholder={defaultUser} />
          </div>
          <span className="profile-username">{user?.username}</span>
          <span className="posts">Posts</span>
          <span className="followers">Followers</span>
          <span className="following">Following</span>
          <span className="posts-count">{user?.postCount}</span>
          <span className="followers-count">{user?.followers.length}</span>
          <span className="following-count">{user?.following.length}</span>
          <div aria-disabled="false" role="button">
            <Link to="/upload">
              <img src={circledPlus} className="circled-plus" alt="circled-plus" />
            </Link>
          </div>
          <div aria-disabled="false" role="button">
            <Link to="/setting">
              <img src={setting} className="user-setting" alt="user-setting" />
            </Link>
          </div>
        </div>
        <div className="boxes">
          <div className="box1">
            <img src={image1?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box2">
            <img src={image2?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box3">
            <img src={image3?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box4">
            <img src={image4?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box5">
            <img src={image5?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box6">
            <img src={image6?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box7">
            <img src={image7?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box8">
            <img src={image8?.body} alt="" width="100%" height="100%" />
          </div>
          <div className="box9">
            <img src={image9?.body} alt="" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
