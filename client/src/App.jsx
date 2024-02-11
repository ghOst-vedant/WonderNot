import { Home } from "@mui/icons-material";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/home/HomePage.jsx";
import LoginPage from "scenes/login/LoginPage.jsx";
import ProfilePage from "scenes/profilePage/ProfilePage.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import axios from "axios";
import Chat from "./scenes/Chat/Chat";
axios.defaults.baseURL = import.meta.env.VITE_TEST;

const App = () => {
  const isMobileScreens = useMediaQuery("(max-width:800px)");
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} duration={8000} />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/chat"
              element={isAuth ? <Chat /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/chat/:chatId"
              element={isAuth ? <Chat /> : <Navigate to="/" />}
            /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
