import React from 'react';
import './loginStyle.css';
// import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Registration from './components/registration';
import SuccessfulRegistration from './components/successfulRegistration';
import UpdatePassword from './components/updatePassword';
import PasswordReset from './components/passwordReset';
import Upload from './upload';
import './css/profile.css';
import Profile from './profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/successful" element={<SuccessfulRegistration />} />
        <Route path="/update" element={<UpdatePassword />} />
        <Route path="/reset" element={<PasswordReset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
