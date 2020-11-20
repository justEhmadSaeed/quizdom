import "./App.css";
import Home from "./components/Home";
import OneTimeDashBoard from './components/OneTimeDashboard';
import CreateQuiz from './components/CreateQuiz';
import JoinQuiz from './components/JoinQuiz';
import { Switch, Route } from "react-router-dom";
import React , {useState} from 'react';

const App = () => {
  const [User, setUser] = useState({name:"",id:""});
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path = {User.id+"/new-user-dashboard"}>
          <OneTimeDashBoard user = {User}/>
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
