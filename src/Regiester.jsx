import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Regiester.css';
import girlImage from './images/girl.png'; 
import Navbar from './Navbar';
import authService from './authService';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await authService.signUp(formData);
        if (data.message === 'Done') {
          navigate('/login');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error details:", error); // Log error details
        alert(error.message || 'Registration failed');
      }
      setFormData({
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-left">
          <img src={girlImage} alt="Girl" />
          <div className="speech-bubble">
            <p>Hello! I'm Lessa, your assistant. I'll help you manage your time and set your tasks!</p>
          </div>
        </div>
        <div className="register-right">
          <div className="form-container">
            <h2>New Account?</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username :</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter Your username"
                  name="username"
                  value={formData.username}
                  onChange={getUserData}
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number :</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter Your phone"
                  name="phone"
                  value={formData.phone}
                  onChange={getUserData}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Mail :</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Your email"
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
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password :</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="form-control"
                  placeholder="Enter Your confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={getUserData}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
              <button type="submit" className="btn">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
