import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import "./index.css";
import Welcome from "./components/Welcome";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Post from "./components/Post";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div className="box-border">
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Nav />
        <Routes>
          <Route path="/login" element={<Form />} />
          <Route path="/register" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
