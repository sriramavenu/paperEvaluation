import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { LuFilePen } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa"; // New icon for Assignments
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Remove token from local storage
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const navItems = [
    // { to: "/home/test", icon: <LuFilePen />, label: "Assessment" },
    { to: "/home/assignments", icon: <FaTasks />, label: "Assignments",},
    { to: "/home/progress", icon: <GiProgression />, label: "Progress" },
    // { to: "/home/history", icon: <RiHistoryFill />, label: "Test History" },
    { to: "/home/profile", icon: <CgProfile />, label: "Profile" },
    
    //  {to: "/home",label:""}
  ];

  return (
    <div className="sidebar bg-primary shadow-sm">
      <div className="sidebar-header text-center py-3">
        <NavLink className="sidebar-brand" to="/home/test">
          <h3 className="text-white">Student Portal</h3>
        </NavLink>
      </div>
      <ul className="sidebar-nav" style={{listStyle:"none"}}>
        {navItems.map((item, index) => (
          <li className="nav-item" key={index} >
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active-nav' : ''}`}
              to={item.to}
              aria-label={item.label}
            >
              {item.icon} <span style={{ marginLeft: '8px' }}>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li className="nav-item">
          <button
            className="nav-link logout-button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <MdLogout /> <span style={{ marginLeft: '8px' }}>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;