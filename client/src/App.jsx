import { Home } from "@mui/icons-material";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/home/HomePage.jsx";
import LoginPage from "scenes/login/LoginPage.jsx";
import ProfilePage from "scenes/profilePage/ProfilePage.jsx";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
