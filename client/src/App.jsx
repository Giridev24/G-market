import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import UploadPage from "./components/Upload/UploadPage";
import Cart from "./components/Cart/Cart";
import Favorites from "./components/Favorites/Favorites";
import Orders from "./components/Orders/Orders";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
