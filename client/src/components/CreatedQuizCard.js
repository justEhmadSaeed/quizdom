import React from "react";
import "./CreatedQuizCard.css";

const CreatedQuizCard = ({quiz}) => {
  return (
    <div className="quiz-card">
      <div id="quiz-title">{quiz.title}</div>
      <div id="horizontal-line"></div>
      <div id="row">
        <div id="responses">Responses : {quiz.responses}</div>
        <div id="questions">Questions : {quiz.questions}</div>
      </div>
      <div id={quiz.isOpen}>{quiz.isOpen}</div>
    </div>
  );
};

export default CreatedQuizCard;
