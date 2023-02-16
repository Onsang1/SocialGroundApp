import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import '../css/upload.css';
import { Link } from 'react-router-dom';
import smallLogo from '../socialground_small.png';
import { createPost, getCurrentUser } from '../api/mock_api';

function upload() {
  const S3_BUCKET ='socialground25';
  const REGION ='US East (N. Virginia) us-east-1';
  const ACCESS_KEY ='AKIAS7PKBMUKM7TKB6GU';
  const SECRET_ACCESS_KEY ='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';

  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  }
  const [file, setFile] = useState();

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
    setFile(e.target.files[0]);
    currentFile.push(e.target.files[0]);
    document.getElementById('clickMe').onclick = function handle() { handlePost(); };
  }

  const handleFileInput = (e) => {
      setFile(e.target.files[0]);
    }
  const handleUpload = async (file) => {
      uploadFile(file, config)
          .then(data => console.log(data))
          .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(file)}> Upload to S3</button>
    </div>
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
            <input type="file" data-testid="fileInput" onChange={(e) => handleFileInput(e)} />
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
