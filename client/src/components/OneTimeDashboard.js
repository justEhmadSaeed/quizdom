import React from "react";
import { Link } from "react-router-dom";
import "./OneTimeDashboard.css";

import Appbar from "./reuseable-components/Appbar";

const OneTimeDashboard = ({ user }) => {
  return (
    <div className="one-time-dashboard">
      <Appbar />
      <div className="dashboard-content">
      <Link to={user.id + "create-quiz"}>
        <button id="create-quiz">Create Quiz</button>
      </Link>
        <span class="vertical-line"></span>
      <Link to={user.id + "/join-quiz"}>
        <button id="join-quiz">Join Quiz</button>
      </Link>
      </div>
    </div>
  );
};

export default OneTimeDashboard;
