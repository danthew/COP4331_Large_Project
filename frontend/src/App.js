import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/home" index element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
