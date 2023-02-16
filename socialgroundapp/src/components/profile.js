import React, { useRef, useEffect, useState } from 'react';
import '../css/profile.css';
import { Link } from 'react-router-dom';
import setting from '../icons/settings.png';
import defaultUser from '../icons/default_user.png';
import smallLogo from '../socialground_small.png';
import circledPlus from '../images/circled_plus.jpg';
import { getCurrentUser, getPosts } from '../api/mock_api';

const profile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((res) => {
      // console.log(res);
      setCurrentUser(res);
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
          <span className="profile-username">{currentUser?.username}</span>
          <span className="posts">Posts</span>
          <span className="followers">Followers</span>
          <span className="following">Following</span>
          <span className="posts-count">{currentUser?.postCount}</span>
          <Link to="/Find" state={{ listType: 'followers' }}>
            <span className="followers-count">{currentUser?.followers.length}</span>
          </Link>
          <Link to="/Find" state={{ listType: 'following' }}>
            <span className="following-count">{currentUser?.following.length}</span>
          </Link>
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
          <Link to={`/post/${image1?.id}`} state={{ post: image1 }}>
            <div className="box1">
              <img src={image1?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image2?.id}`} state={{ post: image2 }}>
            <div className="box2">
              <img src={image2?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image3?.id}`} state={{ post: image3 }}>
            <div className="box3">
              <img src={image3?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image4?.id}`} state={{ post: image4 }}>
            <div className="box4">
              <img src={image4?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image5?.id}`} state={{ post: image5 }}>
            <div className="box5">
              <img src={image5?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image6?.id}`} state={{ post: image6 }}>
            <div className="box6">
              <img src={image6?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image7?.id}`} state={{ post: image7 }}>
            <div className="box7">
              <img src={image7?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image8?.id}`} state={{ post: image8 }}>
            <div className="box8">
              <img src={image8?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link to={`/post/${image9?.id}`} state={{ post: image9 }}>
            <div className="box9">
              <img src={image9?.body} alt="" width="100%" height="100%" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default profile;
