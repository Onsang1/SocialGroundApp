import React from 'react';
import largeLogo from '../socialground_large.png';
// import smallLogo from './socialground_small.png';
import '../loginStyle.css';

function updatePassword() {
  return (
    <div id="react-root">
      <div className="reset_password">
        <div className="large-sg-header-homepage-redirect">
          <a href="/">
            <div aria-disabled="false" role="button">
              <img src={largeLogo} className="large-logo" alt="large_logo" />
            </div>
          </a>
        </div>
        <div className="form-container">
          <form className="reset-form" id="reset-form" method="post">
            <div className="login-trouble-description">
              <h2 className="resetMessage">
                Reset Password to Access Your Account.
              </h2>
            </div>
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput3">
                    <span className="form-fields">Email</span>
                    <input
                      aria-label="Enter Your Email"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="resetPwEmail"
                      type="text"
                      className="form-field-entry"
                    //   value={email}
                      id="formInput3"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput4">
                    <span className="form-fields">New Password</span>
                    <input
                      aria-label="Enter Your Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="password"
                      type="password"
                      className="form-field-entry"
                      value=""
                      id="formInput4"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput4">
                    <span className="form-fields">Confirm New Password</span>
                    <input
                      aria-label="Confirm Your Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="confirmPassword"
                      type="password"
                      className="form-field-entry"
                    //   value=""
                      id="formInput10"
                    />
                  </label>
                </div>
              </div>
              <br />
              <div className="form-submit">
                <button className="reset-button" type="submit">
                  <div className="button-label">Reset Password</div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default updatePassword;
