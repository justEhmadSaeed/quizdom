import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatedSuccesfully.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CreatedSuccesfully = ({ user }) => {
  const [Code, setCode] = useState("AsdqweRfgZ");
  const [Copy, setCopy] = useState("Copy Code");
  return (
    <div id="created-quiz">
      <div id="created-quiz-div">
        <div id="message">
          <b>Quiz Created Succefully</b>
          <p>Share the follwong code with your students</p>
        </div>
        <input id="copy-code" type="text" value={Code} />
        <CopyToClipboard text={Code} onCopy={()=>{setCopy("Code Copied!")}}>
          <button className="copy-btn">{Copy}</button>
        </CopyToClipboard>
        <Link to={user.id + "/dashboard"}>
          <button className="copy-btn">Dashboard</button>
        </Link>
      </div>
    </div>
  );
};
export default CreatedSuccesfully;
