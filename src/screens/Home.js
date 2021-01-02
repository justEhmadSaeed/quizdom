import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "../firebase/firebase";
import { useEffect } from "react";

const Home = (props) => {
  const [homeUser, setHomeUser] = useState({ name: "", id: "" });
  var uiConfig = {
    signInflow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      props.setIsLoggedIn(!!user);
      setHomeUser(firebase.auth().currentUser);
    });
  }, [homeUser]);
  return (
    <div id="Home">
      <div id="logo">
        <div id="logo-name">
          <b>Quiz</b>dom
        </div>
        <div id="description">
          Now create and join quiz at a single platform.You can create trivia
          quizzes, personality test, polls and survays. Share out your quiz with
          your students with a unique code.
        </div>
      </div>

      <span id="login-card">
        <label>
          <b>Q</b>
        </label>
        <Link to="/new-user-dashboard">
          <button className="signIn-btn">Sign-in with Google</button>
        </Link>
        <StyledFirebaseAuth
          borderRadius="40px"
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <button className="signIn-btn">Sign-in with Facebook</button>
        <button className="signIn-btn">Sign-in with Email</button>
      </span>
    </div>
  );
};

export default Home;
