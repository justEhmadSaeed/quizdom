import React, { useState } from "react";
import "./AddQuestionCard.css";

const AddQuestionCard = ({ qNo }) => {
  const [Type, setType] = useState("oneOp");
  const [NoOfOptions, setNoOfOptions] = useState(1);
  const [tempArray, setTempArray] = useState([1]);
  
  const addOption = () => {
      let n = NoOfOptions;
      n++;
      setNoOfOptions(n);
      let arr = [...tempArray];
      arr.push(n);
      setTempArray(arr)
      console.log(NoOfOptions, tempArray);
  }
  const handleTypeChange = (e) => {
    let type = e.target.value;
    setType(type);
  };
  var fullForms = {
    oneOp: "One Option Only",
    mulOp: "Multiple Options",
  };
  return (
    <div className="questionCard">
      <div id="title">Question no {qNo}:</div>
      <input id = 'question'type="text" placeholder="Type Question Here" />
      <select id = "select" placeholder="Select" onChange={handleTypeChange}>
        <option className = "selectOp" value="oneOp">{fullForms["oneOp"]}</option>
        <option className = "selectOp" value="mulOp">{fullForms["mulOp"]}</option>
      </select>
      {
        // Render According to the choices
      }
      {Type === "oneOp" ? (
        <div className = "option-div">
          <div className="options" id="one-op">
            {tempArray.map((n) => (
              <div className="option" key={n}>
                <input
                  className="radio-in"
                  type="radio"
                  name="oneOp"
                  value={n}
                />
                <input className="op" type="text" placeholder={"Option " + n} />
              </div>
            ))}
          </div>
          <div className="add-op">
            <input type="submit" className="add-btn" value="+" onClick={addOption}/>
            <label className="op-label">Add Option</label>
          </div>
        </div>
      ) : Type === "mulOp" ? (
        <div className = "option-div">
          <div className="options" id="mul-op">
            {tempArray.map((n) => (
              <div className="option" key={n}>
                <input
                  className="check-in"
                  type="checkbox"
                  name="mulOp"
                  value={n}
                />
                <input className="op" type="text" placeholder={"Option " + n} />
              </div>
            ))}
          </div>
          <div className="add-op">
            <input type="submit" className="add-btn" value="+" onClick={addOption}/>
            <label className="op-label">Add Option</label>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddQuestionCard;
