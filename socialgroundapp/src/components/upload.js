import React, { useState } from 'react';
import '../css/upload.css';
import { Link } from 'react-router-dom';
import smallLogo from '../socialground_small.png';
import { createPost, getCurrentUser } from '../api/mock_api';

function upload() {
  const [file, setFile] = useState();
  // const [postCaption, setCaption] = useState('');

  // function handleCaption(e) {
  //   setCaption(e);
  // }
  const currentFile = [];
  async function handlePost() {
    const user = await getCurrentUser();
    const postInfo = {
      author: user.username,
      userId: user.id,
      caption: document.getElementById('searchTxt').value,
    };
    await createPost(currentFile[0], postInfo, user);
    window.location.href = 'http://localhost:3000/profile';
  }

  async function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    currentFile.push(e.target.files[0]);
    document.getElementById('clickMe').onclick = function () { handlePost(); };
  }

  return (
    <div id="react-root">
      <div aria-disabled="false" role="button">
        <Link to="/Feed">
          <img src={smallLogo} className="sg-logo-small" alt="sg-logo-small" />
        </Link>
      </div>
      <div className="main-body">
        <div className="select-box" />
        <div className="select-text">
          {/* Select Photo/Video from Device */}
          <form action="http://localhost:3000" method="POST">
            <img id="imageid" src={file} alt="Select file from device" />
            <input type="file" data-testid="fileInput" onChange={(e) => handleChange(e)} />
          </form>
        </div>
        <span className="new-post">New Post</span>
        <button type="button" id="clickMe" className="share" data-testid="shareButton">Share</button>
        <Link to="/profile">
          <a href="/profile" className="cancel">Cancel</a>
        </Link>
        {/* use input instead of blockquote */}
        {/* <blockquote contentEditable="true" className="caption-box">
          <h1 style={{ color: 'gray' }}>Enter Caption...</h1>
        </blockquote> */}
        <textarea type="text" id="searchTxt" className="caption-box" />
        <div className="footnotes">
          <span>@ Tag Users</span>
          <br />
          <span>Privacy Settings</span>
        </div>
      </div>
    </div>
  );
}

export default upload;
