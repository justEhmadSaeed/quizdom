import React, { useState } from "react";
import { Link } from "react-router-dom";

const AttemptQuiz = (props) => {
  const [attemptedQuestions, setAttemptedQuestions] = useState(() => {
    const temp = [];
    props.questions.forEach((ques) => {
      temp.push({
        title: ques.title,
        type: ques.optionType,
        selectedOptions: [],
      });
    });
    return temp;
  });

  const handleOptionSelect = (e, option, index) => {
    const temp = [...attemptedQuestions];
    const options = temp[index].selectedOptions;

    if (!options.includes(option) && e.target.checked) {
      options.push(option);
    }
    if (options.includes(option) && !e.target.checked) {
      const i = options.indexOf(option);
      options.splice(i, 1);
    }

    temp[index].selectedOptions = options;
    setAttemptedQuestions(temp);
  };

  console.log("selected options : ", attemptedQuestions);
  const submitQuiz = () => {
    // send attemped Questions to backend
  };
  return (
    <div id="main-body">
      <div id="create-quiz-body">
        <div className="quiz-header">
          <h2>{props.quizTitle}</h2>
        </div>
        {props.questions.map((question, index) => (
          <div className="questionCard" key={index}>
            <div id="title">{question.title}</div>
            <div className="option-div">
              {question.options.map((option, ind) => (
                <div className="option" key={ind}>
                  {question.optionType === "oneOp" ? (
                    <input
                      type="radio"
                      name="option"
                      onChange={(e) =>
                        handleOptionSelect(e, option.text, index)
                      }
                    />
                  ) : (
                    <input
                      type="checkbox"
                      name="option"
                      onChange={(e) =>
                        handleOptionSelect(e, option.text, index)
                      }
                    />
                  )}
                  <label>{option.text}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link to="quiz-attempted">
          <button className="button wd-200" onClick={submitQuiz}>
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AttemptQuiz;
