import React from "react";
import "./CreatedQuizCard.css";

const CreatedQuizCard = ({ title, responses, questions, isOpen }) => {
  return (
    <div className="quiz-card">
      <div id="quiz-title">{title}</div>
      <div id="horizontal-line" />
      <div id="row">
        <div id="responses">Responses : {responses}</div>
        <div id="questions">Questions : {questions}</div>
      </div>
      <div id="open-status">{isOpen}</div>
    </div>
  );
};

export default CreatedQuizCard;
