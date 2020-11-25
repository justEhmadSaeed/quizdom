import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './CreatedSuccesfully.css';
const CreatedSuccesfully = ({user}) => {
  
  return( 
    <div id="created-quiz">
      <div id = "created-quiz-div">
      <div id="message">
        <b>
          Quiz Created Succefully</b>
        <p>Share the follwong code with your students</p>
        </div>
      <input id="copy-code" type="text" placeholder="AsdqweRfgZ" />
      <button className = "copy-btn" >copy</button>
      </div>
  </div>
  );
}
export default CreatedSuccesfully