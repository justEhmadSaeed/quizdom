import "./App.css";
import Home from "./components/Home";
import OneTimeDashBoard from './components/OneTimeDashboard';
import CreateQuiz from './components/CreateQuiz';
import JoinQuiz from './components/JoinQuiz';
import { Switch, Route } from "react-router-dom";
import React , {useState} from 'react';

const App = () => {
  const [Uid, setUid] = useState("");
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path = {Uid+"/new-user-dashboard"}>
          <OneTimeDashBoard uid = {Uid}/>
        </Route>
        <Route exact path = {Uid+"/create-quiz"}>
          <CreateQuiz uid = {Uid}/>
        </Route>
        <Route exact path = {Uid+"/join-quiz"}>
          <JoinQuiz uid = {Uid}/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
