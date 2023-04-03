import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import AddRecipePage from './pages/AddRecipePage';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/home" index element={<HomePage />} />
        <Route path="/addRecipe" index element={<AddRecipePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
