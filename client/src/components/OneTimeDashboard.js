import React from "react";
import { Link } from "react-router-dom";
import "./OneTimeDashboard.css";
import Appbar from "./reuseable-components/Appbar";

const OneTimeDashboard = ({ user }) => {
  return (
    <div className="one-time-dashboard">
      <Appbar user = {user} />
      <div id="dashboard-content">
      <Link to={user.id + "/dashboard"}>
        <button className="create-quiz">Create Quiz</button>
      </Link>
        <span className="vertical-line"></span>
      <Link to={user.id + "/join-quiz"}>
        <button className="join-quiz">Join Quiz</button>
      </Link>
      </div>
    </div>
  );
};

export default OneTimeDashboard;
