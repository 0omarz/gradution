import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import loginImage from './images/login.png';
import Navbar from './Navbar';
import authService from './authService';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await authService.signIn(formData);
        if (data.message === 'Done') {
          localStorage.setItem('UserToken', data.updatedUser.Token); 
          navigate('/todo');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error details:", error); // Log error details
        alert(error.message || 'Login failed');
      }
      setFormData({
        email: '',
        password: ''
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="slogan">
        <h2>Welcome to Your Task Mastery Zone</h2>
      </div>
      <div className="login-container">
        <div className="login-left">
          <img src={loginImage} alt="Girl" />
        </div>
        <div className="login-right">
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username-email"> Email :</label>
                <input
                  type="text"
                  id="username-email"
                  className="form-control"
                  placeholder="Enter Your username or email"
                  name="email"
                  value={formData.email}
                  onChange={getUserData}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Your password"
                  name="password"
                  value={formData.password}
                  onChange={getUserData}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
              <button type="submit" className="btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
