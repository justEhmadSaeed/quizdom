import { Switch, Route } from "react-router-dom";
import React , {useState} from 'react';
// Stylesheet
import "./App.css";
// Components
import Home from "./components/Home";
import OneTimeDashBoard from './components/OneTimeDashboard';
import CreateQuiz from './components/CreateQuiz';
import JoinQuiz from './components/JoinQuiz';
import UserDashboard from './components/UserDashboard';
import CreatedSuccesfully from './components/CreatedSuccesfully';

const App = () => {
  const [User, setUser] = useState({name:"",id:""});
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home user = {User}/>
        </Route>
        <Route exact path ={User.id + "/created-succesfully"}>
          <CreatedSuccesfully user = {User}/>
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
        <Route exact path = {User.id+"/join-quiz"}>
          <JoinQuiz user = {User}/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
