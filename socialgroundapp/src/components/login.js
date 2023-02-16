import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { BrowserRouter as Link } from 'react-router-dom';
import largeLogo from '../socialground_large.png';
// import smallLogo from './socialground_small.png';
import '../loginStyle.css';

let account = {};

function login() {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const handleLogin = (e) => {
    // console.log('check');
    e.preventDefault();
    account = JSON.parse(window.localStorage.getItem(email));
    if (account && account.password === password) {
      // setAuthentication(true);
      localStorage.setItem('authenticated', true);
      // Navigate to activity feed if authenticated
      useNavigate('./ActivityFeed');
    }
  };
  return (
    <div id="react-root">
      <div className="login">
        <div className="form-container">
          <div className="large-sg-header-homepage-redirect">
            <a href="/">
              <div aria-disabled="false" role="button">
                <img src={largeLogo} className="large-logo" alt="large_logo" />
              </div>
            </a>
          </div>
          <form className="login-form" id="login-form" method="post" onSubmit={handleLogin}>
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput1">
                    <span className="form-fields">Enter Your Email</span>
                    <input
                      aria-label="Enter Your Email"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="email"
                      type="text"
                      className="form-field-entry"
                      value={email}
                      onChange={(e) => setUserEmail(e.target.value)}
                      id="formInput1"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-roll" />
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput2">
                    <span className="form-fields">Enter Your Password</span>
                    <input
                      aria-label="Enter Your Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="password"
                      type="password"
                      className="form-field-entry"
                      value={password}
                      onChange={(e) => setUserPassword(e.target.value)}
                      id="formInput2"
                    />
                  </label>
                </div>
              </div>
              {/* <a className="password-reset" href="/reset">Forgot password?</a> */}
              <br />
              <div className="form-submit">
                <button className="submit-button" type="submit">
                  <div className="button-label">Log In</div>
                </button>
              </div>
            </div>
          </form>
          <div className="sign-up-container">
            <p className="sign-up-redirect">
              Don&apos;t have an account?
              <a href="./registration">
                <span className="sign-up">Sign up</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
