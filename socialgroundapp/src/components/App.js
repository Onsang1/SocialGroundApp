import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './ActivityFeed';
import Find from './FindFriends'
import NotFound from "./NotFound";



function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/Feed" element={<Feed />}/>
          <Route path="/Find" element={<Find />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>

  );
}



export default App;
