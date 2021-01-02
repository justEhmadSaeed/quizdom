<<<<<<< HEAD
import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import firebaseConfig from "./firebase/firebaseConfig.js";
import firebase from "firebase/app";
import "firebase/auth";

import { CSSTransition, TransitionGroup } from "react-transition-group";
=======
import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import firebase from "./firebase/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

>>>>>>> d122dd3b86f6493a8bada3fe5479576960404f00
// Stylesheet
import "./App.css";

// Components
import Home from "./screens/Home";
import OneTimeDashBoard from "./screens/OneTimeDashboard";
import CreateQuiz from "./screens/CreateQuiz";
import JoinQuiz from "./screens/JoinQuiz";
import UserDashboard from "./screens/UserDashboard";
import CreatedSuccesfully from "./screens/CreatedSuccesfully";

const App = () => {
  const [User, setUser] = useState({ name: "", id: "" });
<<<<<<< HEAD
  const [isLoggedIn, setisLoggedIn] = useState(false);
  
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home user={User} />
        </Route>

        <Route path="/new-user-dashboard">
          <OneTimeDashBoard user={User} />
        </Route>
        <Route path={User.id + "/dashboard"}>
          <UserDashboard user={User} />
        </Route>
        <Route path={User.id + "/create-quiz"}>
          <CreateQuiz user={User} />
        </Route>
        <Route path={User.id + "/created-succesfully"}>
          <CreatedSuccesfully user={User} />
        </Route>
        <Route path={User.id + "/join-quiz"}>
          <JoinQuiz user={User} />
        </Route>
      </Switch>
=======
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setIsLoggedIn(!!user);
      setUser({
        id: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.displayName,
      });
      console.log("Firebase User - ", user);
      console.log("State User : ", User);
    });
  });

  return (
    <div className="App">
      {!firebase.auth().currentUser ? (
        <div className="Home">
          <StyledFirebaseAuth
            borderRadius="40px"
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <Switch>
          <Route path="/">
            <OneTimeDashBoard user={User} />
          </Route>
          <Route path={User.id + "/dashboard"}>
            <UserDashboard user={User} />
          </Route>
          <Route path={User.id + "/create-quiz"}>
            <CreateQuiz user={User} />
          </Route>
          <Route path={User.id + "/created-succesfully"}>
            <CreatedSuccesfully user={User} />
          </Route>
          <Route path={User.id + "/join-quiz"}>
            <JoinQuiz user={User} />
          </Route>
        </Switch>
      )}
>>>>>>> d122dd3b86f6493a8bada3fe5479576960404f00
    </div>
  );
};

export default App;
