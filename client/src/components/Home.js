import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="Home">
      <span id="logo">
        <b>Quiz</b>dom
      </span>
      <span id="login-card">
        <label><b>Q</b></label>
        <Link to="/new-user-dashboard">
          <button className="signIn-btn">Sign-in with Google</button>
        </Link>
        <button className="signIn-btn">Sign-in with Facebook</button>
        <button className="signIn-btn">Sign-in with Email</button>
      </span>
    </div>
  );
};

export default Home;
