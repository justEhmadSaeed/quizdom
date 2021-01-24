import React, { useRef, useState } from "react";
import "./AddQuestionCard.css";

const AddQuestionCard = () => {
  const [optionType, setOptionType] = useState("radio");
  const [optionsArray, setOptionsArray] = useState([""]);
  const titleField = useRef(null);

  const addOption = () => {
    let arr = [...optionsArray];
    arr.push("");
    setOptionsArray(arr);
  };
  console.log(optionsArray);
  const handleTypeChange = (e) => setOptionType(e.target.value);

  var fullForms = {
    radio: "Single Choice",
    check: "Multiple choices",
  };
  return (
    <div className="questionCard">
      <div id="title">Question:</div>
      <input
        ref={titleField}
        className="question"
        type="text"
        placeholder="Type Question Here"
      />
      <select id="select" placeholder="Select" onChange={handleTypeChange}>
        <option className="selectOp" value="radio">
          {fullForms["radio"]}
        </option>
        <option className="selectOp" value="check">
          {fullForms["check"]}
        </option>
      </select>

      <div className="option-div">
        <div className="options" id="one-op">
          {optionsArray.map((option, key) => (
            <div className="option" key={key}>
              {optionType === "radio" ? (
                <input
                  className="radio-in"
                  type="radio"
                  name="radio"
                  value={option}
                />
              ) : (
                <input
                  className="check-in"
                  type="checkbox"
                  name="check"
                  value={option}
                />
              )}
              <input
                className="op"
                type="text"
                placeholder={`Option ${key + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="add-op">
        <input
          type="submit"
          className="add-btn"
          value="+"
          onClick={addOption}
        />
        <label className="op-label"> Add Option</label>
      </div>
    </div>
  );
};

export default AddQuestionCard;
