import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Regiester from './Regiester';
import Login from './Login';
import ChatBot from './Chatbot'; 
import Pricing from './Pricing';
import Payment from './Payment';
import Todo from './Todo';
import ProfilePage from './ProfilePage'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Regiester/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/chatbot" element={<ChatBot />} />  
        <Route path="/pricing" element={<Pricing />} /> 
        <Route path="/payment" element={<Payment/>} />   
        <Route path="/todo" element={<Todo/>} /> 
        <Route path="/profile" element={<ProfilePage/>} /> 
        
        

      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
