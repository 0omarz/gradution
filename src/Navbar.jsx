/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './images/logo.png'; // Replace with your logo image path


export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className='navbar-logo'>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chatbot">
                 ChatBot
                </Link>
              </li> 
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">
                 Pricing
                </Link>
              </li> 
              <li className="nav-item">
                <Link className="nav-link" to="/todo">
                 Tasks
                </Link>
              </li>  
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li> 
              
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
