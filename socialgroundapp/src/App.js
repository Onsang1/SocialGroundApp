import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/profile';
import Upload from './components/upload';
import Login from './components/login';
import Registration from './components/registration';
import SuccessfulRegistration from './components/successfulRegistration';
import UpdatePassword from './components/updatePassword';
import PasswordReset from './components/passwordReset';
import './css/profile.css';

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
