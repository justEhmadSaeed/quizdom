import React from "react";
import "./AddQuestionCard.css";

const AttemptQuestionCard = (props) => {
  return (
    <div className="questionCard">
      <div id="title">{props.title}</div>
      <div className="option-div">
        {props.optionType === "oneOp"
          ? props.options.map((option, ind) => (
              <div className="option" key={ind}>
                <input className="radio-in" type="radio" name="oneOp" />
                <input className="op" type="text" value={option.text} />
              </div>
            ))
          : props.optionType === "mulOP"
          ? props.options.map((option, ind) => (
              <div className="option" key={ind}>
                <input className="check-in" type="checkbox" name="mulOp" />
                <input className="op" type="text" value={option.text} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AttemptQuestionCard;
