import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Nav from "./Component/Nav";
import "./App.css";

function App() {

  return (
    <div className="home">
      <Nav title="react jwt auth" />
      <p>Home App page</p>
      <Link to='/register'>register</Link>
      <Link to='/login'>login</Link>
      <Link to='/login'>profile</Link>
    </div>
  );
}

export default App;
