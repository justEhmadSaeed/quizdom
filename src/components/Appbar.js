import React, { useState } from "react";
import {Link} from 'react-router-dom';
import Sidebar from "./Sidebar";
import Hamburger from "hamburger-react";

const Appbar = ({ user }) => {
  const [username, setUsername] = useState(user);
  // if (user.name) {
  //   setUsername(user.name);
  // }
  return (
    <div className="appbar">
      <div className="hamburger-menu-sidebar">
      <Sidebar />
      </div>
    </div>
  );
};

export default Appbar;
