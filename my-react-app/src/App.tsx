import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAdPage from './pages/CreateAdPage';
import AdsBoardPage from './pages/AdsBoardPage'; // Assuming you have a home page
import 'bootstrap/dist/css/bootstrap.min.css';  // If you're using Bootstrap


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdsBoardPage />} />
        <Route path="/create-ad" element={<CreateAdPage />} />
      </Routes>
    </Router>
  );
};

export default App;
