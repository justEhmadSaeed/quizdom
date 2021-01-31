import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../screens/Attempted.css";
import firebase from "../firebase/firebase";

const Attempted = ({ match }) => {
  const quizCode = match.params.quizCode;
  const [score, setScore] = useState({ score: "Not yet" });

  useEffect(() => {
    const fetchScore = async () => {
      const res = await fetch(`/API/quizzes/submit/result/`);
      // , {
      //   method: "POST",
      //   body: JSON.stringify({
      //     uid: firebase.auth().currentUser.uid,
      //     quizId: quizCode,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const scoreRetrieved = await res.json();
      console.log("Response in attempted : ", scoreRetrieved);
      setScore(scoreRetrieved);
    };
    fetchScore();
  }, []);

  console.log("Score var : ", score);

  return (
    <div className="attempted_wrapper">
      <div className="attemp_container">
        <h2 className="att_h2">
          {score.error ? "Cannot submit" : "Quiz Attempted Successfully"}
        </h2>
        <h1 className="score_h2">
          {score.error
            ? "You already attempted the quiz"
            : `Score: ${score.score}/100`}
        </h1>
        <Link to={"/dashboard"}>
          <button className="button wd-200">Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Attempted;
