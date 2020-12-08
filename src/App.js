import { Switch, Route } from "react-router-dom";
import React , {useState} from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
// Stylesheet
import "./App.css";
// Components
import Home from "./screens/Home";
import OneTimeDashBoard from './screens/OneTimeDashboard';
import CreateQuiz from './screens/CreateQuiz';
import JoinQuiz from './screens/JoinQuiz';
import UserDashboard from './screens/UserDashboard';
import CreatedSuccesfully from './screens/CreatedSuccesfully';

const App = () => {
  const [User, setUser] = useState({name:"",id:""});
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home user = {User}/>
        </Route>
        <Route exact path = {User.id + "/new-user-dashboard"}>
          <OneTimeDashBoard user = {User}/>
        </Route>
        <Route exact path = {User.id + "/dashboard"}>
          <UserDashboard user = {User}/>
        </Route>
        <Route exact path = {User.id+"/create-quiz"}>
          <CreateQuiz user = {User}/>
        </Route>
        <Route exact path ={User.id + "/created-succesfully"}>
          <CreatedSuccesfully user = {User}/>
        </Route> 
        <Route exact path = {User.id+"/join-quiz"}>
          <JoinQuiz user = {User}/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
