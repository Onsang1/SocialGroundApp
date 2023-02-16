import React, { useState } from 'react';
import '../css/upload.css';
import { Link } from 'react-router-dom';
import smallLogo from '../socialground_small.png';
import { createPost } from '../api/mock_api';

function upload() {
  const [file, setFile] = useState();
  // const [postCaption, setCaption] = useState('');

  // function handleCaption(e) {
  //   setCaption(e);
  // }

  // function handleChange(e) {
  //   // show image
  //   setFile(URL.createObjectURL(e.target.files[0]));

  //   // read image
  //   const reader = new FileReader();

  //   reader.onloadend = function onloadend() {
  //     // save base 64 string to json server
  //     const xmlhttp = new XMLHttpRequest();
  //     const url = 'http://localhost:8000/posts';
  //     xmlhttp.open('POST', url);
  //     xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //     xmlhttp.send(JSON.stringify({ id: '235', content: reader.result }));
  //   };

  //   // convert image to base 64
  //   reader.readAsDataURL(e.target.files[0]);
  // }

  function handleChange(e) {
    // show image
    setFile(URL.createObjectURL(e.target.files[0]));

    // read image
    const reader = new FileReader();

    reader.onloadend = function onloadend() {
      // save base 64 string to json server
      const xmlhttp = new XMLHttpRequest();
      const url = 'http://localhost:8000/posts';
      xmlhttp.open('POST', url);
      xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xmlhttp.send(JSON.stringify({ id: '235', content: reader.result }));
    };

    // convert image to base 64
    reader.readAsDataURL(e.target.files[0]);
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
            <input type="file" onChange={(e) => handleChange(e)} />
          </form>
        </div>
        <span className="new-post">New Post</span>
        {/* button on click, call api where i post photos to the json files */}
        <Link to="/profile">
          <button type="button" className="share">Share</button>
        </Link>
        <Link to="/profile">
          <a href="/profile" className="cancel">Cancel</a>
        </Link>
        <blockquote contentEditable="true" className="caption-box">
          <h1 style={{ color: 'gray' }}>Enter Caption...</h1>
        </blockquote>
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
