import React from "react";
import "./Appbar.css";
import Hamburger from 'hamburger-react';
const Appbar = () => {
  return( 
    <div className="appbar">
        <div className="hamburger-menu">
          <Hamburger 
            rounded  
            color="#FFFFFF"
            distance="sm" />
        </div>
        <div className="home"> <b>Quiz</b>dom </div>
    </div>
  );
}

export default Appbar;