import React, {useState} from 'react'
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Sidebar.css";
import "./colors.css";
import { IconContext } from 'react-icons';
import firebase from "../firebase/firebase"

function Sidebar() {

  const SidedbarData =[
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <AiIcons.AiFillDashboard />,
      CName: 'nav-text',
    },
    {
      title: 'Join Quiz',
      path: '/',
      icon: <FaIcons.FaPencilAlt />,
      CName: 'nav-text',
    },
    {
      title: 'Create Quiz',
      path: '/create-quiz',
      icon: <AiIcons.AiFillFolderAdd />,
      CName: 'nav-text',
    },
    {
      title: 'Logout',
      path: '/',
      icon: <FaIcons.FaUser />,
      CName: 'nav-text',
    },
  ]
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
    <IconContext.Provider value={{color: 'white'}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <Link to="/new-user-dashboard" className = "home">
          <b>Quiz</b>dom
      </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
              <AiIcons.AiOutlineClose />
          </li>
          {SidedbarData.map((item, index) => {
            return ( 
              <li key={index} className={item.CName}>
                <Link to={item.path}>
                  {item.icon}
                  <span className="nav-item-title">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
