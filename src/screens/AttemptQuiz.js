import React from "react";
import AttemptQuestionCard from "../components/AttemptQuestionCard";
import Appbar from "../components/Appbar";

const AttemptQuiz = (props) => {
  return (
    <div id="main-body">
      <div className="appheader">
        <Appbar user={props.user} />
      </div>
      <div id="create-quiz-body">
        <div className="quiz-header">
          <input id="quiz-title" type="text" value={props.quizTitle} />
        </div>
        {props.questions.map((question) => (
          <AttemptQuestionCard
            title={question.title}
            optionType={question.optionType}
            options={question.options}
          />
        ))}
      </div>
    </div>
  );
};

export default AttemptQuiz;
