import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Profile from "./Component/Profile";
import NotFound from "./Component/NotFound";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
