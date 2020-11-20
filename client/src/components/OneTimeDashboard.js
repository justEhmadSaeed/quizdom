import React from "react";
import { Link } from "react-router-dom";
import "./OneTimeDashboard.css";

const OneTimeDashboard = ({ user }) => {
  return (
    <div id="one-time-dashboard">
      <Link to={user.id + "create-quiz"}>
        <button id="create-quiz">Create Quiz</button>
      </Link>
      <span id="line" />
      <Link to={user.id + "/join-quiz"}>
        <button id="join-quiz">Join Quiz</button>
      </Link>
    </div>
  );
};

export default OneTimeDashboard;
