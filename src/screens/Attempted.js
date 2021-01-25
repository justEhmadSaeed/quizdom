import Appbar from "../components/Appbar";
import React from "react";
import { Link } from "react-router-dom";
import "../screens/Attempted.css";
const Attempted = (props) => {
  return (
    <div className="attempted_wrapper">
      <div className="appheader">
        <Appbar user={props.user} />
      </div>
      <div className="attemp_container">
        <h2 className="att_h2">Quiz Attempted Successfully</h2>
        <h1 className="score_h2">Score: 100/100</h1>
        <Link to={"/dashboard"}>
          <button className="button">Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Attempted;
