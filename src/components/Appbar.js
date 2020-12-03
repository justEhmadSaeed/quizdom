import React, { useState } from "react";
import {Link} from 'react-router-dom';
import "./Appbar.css";
import Hamburger from "hamburger-react";
const Appbar = ({ user }) => {
  const [username, setUsername] = useState("UserName");
  if (user.name) {
    setUsername(user.name);
  }
  return (
    <div className="appbar">
      <div className="hamburger-menu">
        <Hamburger rounded color="#FFFFFF" distance="sm" />
      </div>
      <Link to={user.id + "/new-user-dashboard"} className = "home">
          <b>Quiz</b>dom
      </Link>

      
    </div>
  );
};

export default Appbar;
