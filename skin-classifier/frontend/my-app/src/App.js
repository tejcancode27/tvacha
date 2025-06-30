// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SymptomsPage from './pages/SymptomsPage';
import ClassifierPage from './pages/ClassifierPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar is only here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/symptoms" element={<SymptomsPage />} />
        <Route path="/classifier" element={<ClassifierPage />} />
      </Routes>
    </Router>
  );
}

export default App;
