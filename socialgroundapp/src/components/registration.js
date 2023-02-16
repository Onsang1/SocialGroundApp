import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import largeLogo from '../socialground_large.png';
// import smallLogo from './socialground_small.png';
import '../loginStyle.css';

function registration() {
  // Registration states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = {
    name: '',
    email: '',
    password: '',
  };

  // Check for error
  const [submit, setSubmit] = useState(false);
  const [blankError, setBlankError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleNameUpdate = (e) => {
    user.name = e.target.value;
    setName(e.target.value);
    setSubmit(false);
  };

  // Handling the email change
  const handleEmailUpdate = (e) => {
    user.email = e.target.value;
    setEmail(e.target.value);
    setSubmit(false);
  };

  // Handling the password change
  const handlePasswordUpdate = (e) => {
    user.password = e.target.value;
    setPassword(e.target.value);
    setSubmit(false);
  };

  // Handling the password change
  const handleConfirmPasswordUpdate = (e) => {
    setConfirmPassword(e.target.value);
    setSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If any field is not filled
    if (name === '' || email === '' || password === '') {
      setBlankError(true);
    } else if (email.indexOf('@') === -1) {
      setEmailError(true);
    } else if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setSubmit(true);
      setBlankError(false);
      setEmailError(false);
      setPasswordError(false);
      localStorage.setItem(user.email, JSON.stringify(user));
    }
  };

  const successfulMessage = () => (
    <div
      className="regMsg"
      style={{
        display: submit ? '' : 'none',
      }}
    >
      <h4>
        Your account has been successfully registered.
        You will be redirected to the Login Page.
      </h4>
    </div>
  );

  const blankErrorMessage = () => (
    <div
      className="regMsg"
      style={{
        display: blankError ? '' : 'none',
      }}
    >
      <h4>One or more fields is/are missing. Please fill in all fields.</h4>
    </div>
  );

  const emailErrorMessage = () => (
    <div
      className="regMsg"
      style={{
        display: emailError ? '' : 'none',
      }}
    >
      <h4>Your email is in an invalid format. Please re-enter.</h4>
    </div>
  );

  const passwordErrorMessage = () => (
    <div
      className="regMsg"
      style={{
        display: passwordError ? '' : 'none',
      }}
    >
      <h4>Your password entries do not match. Please re-enter.</h4>
    </div>
  );

  return submit ? (
    <Navigate to="/" />
  ) : (
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
          <form className="login-form" id="login-form" method="post" onSubmit={handleSubmit}>
            <h2 className="registrationMessage">
              Sign up to see photos and videos from others.
            </h2>
            <div className="regMsg">
              {successfulMessage()}
              {blankErrorMessage()}
              {emailErrorMessage()}
              {passwordErrorMessage()}
            </div>
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput6">
                    <span className="form-fields">Full Name</span>
                    <input
                      aria-label="Full Name"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="username"
                      type="text"
                      className="form-field-entry"
                      // value={name}
                      onChange={(e) => handleNameUpdate(e.target.value)}
                      id="formInput6"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput7">
                    <span className="form-fields">Email</span>
                    <input
                      aria-label="Email"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="email"
                      type="text"
                      className="form-field-entry"
                      // value={email}
                      onChange={(e) => handleEmailUpdate(e.target.value)}
                      id="formInput7"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput8">
                    <span className="form-fields">Password</span>
                    <input
                      aria-label="Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="password"
                      type="password"
                      className="form-field-entry"
                      // value={password}
                      onChange={(e) => handlePasswordUpdate(e.target.value)}
                      id="formInput8"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput8">
                    <span className="form-fields">Confirm Password</span>
                    <input
                      aria-label="Confirm Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="reenter-password"
                      type="password"
                      className="form-field-entry"
                      // value={confirmPassword}
                      onChange={(e) => handleConfirmPasswordUpdate(e.target.value)}
                      id="formInput9"
                    />
                  </label>
                </div>
              </div>
              <br />
              <div className="form-submit">
                <button className="submit-button" type="submit">
                  <div className="button-label">Sign Up</div>
                </button>
              </div>
            </div>
          </form>

          <div className="log-in-container">
            <p className="log-in-redirect">
              Already have an account?
              <a href="/">
                <span className="log-in">Log In</span>
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default registration;
