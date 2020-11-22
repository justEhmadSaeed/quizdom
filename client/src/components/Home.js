import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="Home">
      <div id="logo">
        <div id="logo-name"><b style={{fontweight : 600}}>Quiz</b>dom</div>
        <div id="description">
          Now create and join quiz at a single platform.You can 
          create trivia quizzes, personality test, polls and survays.
          Share out your quiz with your students with a unique code. 
        </div>
      </div>
      
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
