import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#007bff', padding: '10px 0', width:'100%' }}>
      <div className="container">

        <NavLink 
          className="navbar-brand" 
          to="/" 
          style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}
        >
          Login System
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: '#fff' }}
        >
          <span className="navbar-toggler-icon" style={{ color: '#fff' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/" 
                style={({ isActive }) => ({ 
                  color: isActive ? '#007bff' : '#fff', 
                  backgroundColor: isActive ? '#fff' : 'transparent', 
                  borderRadius: '5px', 
                  padding: '5px 10px', 
                  transition: 'all 0.3s ease', 
                  margin: '0 5px' 
                })}
              >
                Student Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/teacher-login" 
                style={({ isActive }) => ({ 
                  color: isActive ? '#007bff' : '#fff', 
                  backgroundColor: isActive ? '#fff' : 'transparent', 
                  borderRadius: '5px', 
                  padding: '5px 10px', 
                  transition: 'all 0.3s ease', 
                  margin: '0 5px' 
                })}
              >
                Teacher Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;