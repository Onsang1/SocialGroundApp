import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import smallLogo from '../socialground_small.png';
import '../css/loginStyle.css';
import defaultUser from '../icons/default_user.png';
// import { getUsers } from '../api/mock_api';

function setting() {
  // const navigate = useNavigate();
  // const userId = 1;
  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // const [errorMessage, setErrorMessage] = useState('');
  // const [error, setError] = useState(true);

  // const handleCurrentPassword = (e) => {
  //   setCurrentPassword(e.target.value);
  // };

  // const handleNewPassword = (e) => {
  //   setNewPassword(e.target.value);
  // };

  // const handleConfirmNewPassword = (e) => {
  //   setConfirmNewPassword(e.target.value);
  // };

  // const handlePasswordUpdate = async (e) => {
  //   e.preventDefault();

  //   const userList = await getUsers();
  //   const foundUser = userList.find((currUser) => Number(currUser.id) === userId);

  //   if (foundUser.password !== currentPassword) {
  //     setError(true);
  //     setErrorMessage('Current password is not valid. Please re-enter.');
  //     return;
  //   }

  //   if (foundUser.newPassword !== currentPassword) {
  //     setError(true);
  //     setErrorMessage('New password does not match confirmation password. Please re-enter.');
  //     return;
  //   }
  //   setError(false);
  // };

  return (
    <div id="react-root">
      <div className="reset_password">
        <div className="small-logo-redirect">
          <a href="/profile">
            <div aria-disabled="false" role="button">
              <img src={smallLogo} className="small_logo" alt="small_logo" />
            </div>
          </a>
        </div>
        <button type="button">
          <Link to="/profile">Back to Profile</Link>
        </button>
        <div className="form-container">
          <div className="user-setting-icon">
            <img src={defaultUser} className="user-setting-icon" alt="user-setting-icon" />
          </div>
          <form className="reset-form" id="reset-form" method="post">
            <div className="login-trouble-description">
              <h2 className="resetMessage">
                Update Your Account Password.
              </h2>
            </div>
            <div className="regMsg">
              {/* {errorMessage()} */}
            </div>
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput4">
                    <span className="form-fields">Current Password</span>
                    <input
                      aria-label="currPassword"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="currentPassword"
                      type="password"
                      // value={currentPassword}
                      // onChange={(e) => handleCurrentPassword(e)}
                      className="form-field-entry"
                      id="formInput20"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput4">
                    <span className="form-fields">New Password</span>
                    <input
                      aria-label="newPassword"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="password"
                      type="password"
                      className="form-field-entry"
                      // value={newPassword}
                      // onChange={(e) => handleNewPassword(e)}
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
                      aria-label="confirmNewPassword"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="confirmPassword"
                      type="password"
                      className="form-field-entry"
                      // value={confirmNewPassword}
                      // onChange={(e) => handleConfirmNewPassword(e)}
                      id="formInput10"
                    />
                  </label>
                </div>
              </div>
              <br />
              <div className="form-submit">
                <button className="reset-button" type="submit">
                  <div className="button-label">Submit</div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // ) : (navigate('/Profile'));
  );
}

export default setting;
