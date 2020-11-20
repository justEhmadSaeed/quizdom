import React from "react";
import { Link } from "react-router-dom";
import "./OneTimeDashboard.css";

const OneTimeDashboard = ({ uid }) => {
  return (
    <div id="one-time-dashboard">
      <Link to={uid + "create-quiz"}>
        <button id="create-quiz">Create Quiz</button>
      </Link>
      <span id="line" />
      <Link to={uid + "/join-quiz"}>
        <button id="join-quiz">Join Quiz</button>
      </Link>
    </div>
  );
};

export default OneTimeDashboard;
