import React from "react";
import Appbar from "../components/Appbar";
import { Link } from "react-router-dom";
import "./AttemptQuiz.css";

const AttemptQuiz = (props) => {
  return (
    <div id="main-body">
      <div className="appheader">
        <Appbar user={props.user} />
      </div>
      <div id="create-quiz-body">
        <div className="quiz-header">
          <label id="quiz-title">{props.quizTitle}</label>
        </div>
        {props.questions.map((question, index) => (
          <div className="questionCard" key={index}>
            <div id="title">{question.title}</div>
            <div className="option-div">
              {question.options.map((option, ind) => (
                <div className="option" key={ind}>
                  {question.optionType === "oneOp" ? (
                    <input className="radio-in" type="radio" name="oneOp" />
                  ) : (
                    <input className="check-in" type="checkbox" name="mulOp" />
                  )}
                  <label className="option-text">{option.text}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link to="/quiz-attempted">
          <button>Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default AttemptQuiz;
