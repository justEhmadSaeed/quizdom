import React from "react";
import { Link } from "react-router-dom";
import "./JoinQuiz.css";

const JoinQuiz = ({ user }) => {
  return (
    <div id="join-quiz">
      <div id="join-quiz-div">
        <div id="logo-name">
          <b style={{ fontweight: 600 }}>Quiz</b>dom
        </div>
        <input id="q-code" type="text" placeholder="Enter Quiz Code" />
        <Link to="/attempt-quiz">
          <button className="join-button">Join Quiz</button>
        </Link>
      </div>
    </div>
  );
};

export default JoinQuiz;
