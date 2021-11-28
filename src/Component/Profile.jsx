import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Profile() {
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();

  const getUser = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const dateNow = Date.now() / 1000;
    if (token.exp < dateNow) {
      localStorage.removeItem("token");
      alert("hash token has been expired!!");
    } else {
      setUserEmail(token.email);
    }
  };

  console.log("profile :", userEmail);

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="profile">
      <h3>profile</h3>
      <h2>your email : {userEmail}</h2>
      <Link to="/register">Register</Link>
      <a onClick={() => handleLogout()}>logout</a>
    </div>
  );
}

export default Profile;
