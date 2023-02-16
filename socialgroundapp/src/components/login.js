/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import largeLogo from '../socialground_large.png';
import '../css/loginStyle.css';
import Find from './FindFriends';
import { getUserByEmail, setLogin } from '../api/mock_api';

function login() {
  // check sessionStorage for previous token
  const [connected, setConnected] = useState(sessionStorage.getItem('app-token') !== null);
  const navigate = useNavigate();

  if (connected) {
    navigate('/Feed');
  }

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(true);

  const userAccount = {
    accountEmail: userEmail,
    accountPassword: userPassword,
    id: '',
  };

  // useEffect(() => {
  //   const userID = localStorage.getItem('user');

  // const handleLogout = () => {
  //   setUser({});
  //   setUserEmail('');
  //   setUserPassword('');
  //   sessionStorage.removeItem('app-token');
  //   setConnected(false);
  //   navigate('/');
  // };

  // if (user) {
  //   // navigate(`./Feed/${user}`);
  //   navigate('/Feed');
  // }

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const currUser = await getUserByEmail(userEmail);
    if (!currUser) {
      setError(true);
      setErrorMessage('Invalid Credentials.');
      return;
    }
    console.log(userPassword);
    console.log(userEmail);

    if (currUser.password === userPassword
      && currUser.email === userEmail) {
      setError(false);
      setErrorMessage('');
      userAccount.id = currUser._id;
      sessionStorage.setItem('user', JSON.stringify(currUser._id));
      setLogin(currUser._id);
      setConnected(true);
      if (currUser.following.length === 0) {
        <Find state={{ listType: 'suggestion' }} />;
      }
    } else {
      setError(true);
      setErrorMessage('Invalid Credentials.');
    }
  };
  return error ? (
    <div id="react-root">
      <div className="login">
        <div className="form-container">
          <form className="login-form" id="login-form" method="post" onSubmit={handleLogin}>
            <div className="large-sg-header-homepage-redirect">
              <a href="/">
                <div aria-disabled="false">
                  <img src={largeLogo} className="large-logo" alt="large_logo" />
                </div>
              </a>
            </div>
            {error && <div className="errorMessage">{errorMessage}</div>}
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
                      maxLength="100"
                      name="email"
                      type="text"
                      className="form-field-entry"
                      value={userEmail}
                      onChange={(e) => handleUserEmail(e)}
                      id="formInput1"
                      data-testid="loginUserEmail"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput2">
                    <span className="form-fields">Enter Your Password</span>
                    <input
                      aria-label="Enter Your Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="password"
                      type="password"
                      className="form-field-entry"
                      value={userPassword}
                      onChange={(e) => handleUserPassword(e)}
                      id="formInput2"
                      data-testid="loginUserPw"
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
            <div className="sign-up-container">
              <p className="sign-up-redirect">
                Don&apos;t have an account?&nbsp;
                <a href="./registration">
                  <span className="sign-up">Sign up</span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
    : (navigate('/Feed'));
  // (navigate(`./Feed/${userAccount.id}`));
}

export default login;
