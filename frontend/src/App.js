import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import AddRecipePage from 'pages/AddRecipePage';
import ViewRecipePage from 'pages/ViewRecipePage';
import EditRecipePage from 'pages/EditRecipePage';
import VPage from 'pages/VerifyPage';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/home" index element={<HomePage />} />
        <Route path="/addRecipe" index element={<AddRecipePage />} />
        <Route path="/viewRecipe" index element={<ViewRecipePage />} />
        <Route path="/editRecipe" index element={<EditRecipePage />} />
        <Route path="/VerificationPage" index element={<VPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
