import React from 'react';
import './PaymentCards.css'; // Import the updated CSS file for payment cards
import Navbar from './Navbar'; 
import { Link } from 'react-router-dom';
export default function Pricing() {
  return ( 
    <>
      <Navbar />
    <div className="pricing-container">  
        <div className='title'> 
        <h2>Subscriptions Plans</h2> 
        <p>Unlock Premium Perks: Because You're Worth It!</p>
        </div>
        
      <div className="payment-cards-section">
        <div className="payment-card">
          {/* Card 1 - Basic */}
          <div className="payment-card-inner">
            <div className="card-header">
              <h3>Basic</h3>
              <p>$9.99<span>/month</span></p>
            </div>
            <div className="card-body">
              <ul>
                <li>Daily Task Scheduling</li>
                <li>AI Task Reminders</li>
                <li>Limited Integrations</li>
                <li>Basic Analytics</li>
                
              </ul>
              <Link className="choose-plan-btn" to="/payment">Choose Plan</Link>
            </div>
          </div>
        </div>

        <div className="payment-card">
          {/* Card 2 - Pro */}
          <div className="payment-card-inner">
            <div className="card-header">
              <h3>Pro</h3>
              <p>$19.99<span>/month</span></p>
            </div>
            <div className="card-body">
              <ul>
                <li>Access to all basic features</li>
                <li>Priority Task Notifications</li>
                <li>24/7 Email and Chat Support</li>
                <li>Chatbot with Enhanced Capabilities</li>
                <li>Unlimited Integrations</li>
              </ul>
              <Link className="choose-plan-btn" to="/payment">Choose Plan</Link>
            </div>
          </div>
        </div>

        <div className="payment-card">
          {/* Card 3 - Premium */}
          <div className="payment-card-inner">
            <div className="card-header">
              <h3>Premium</h3>
              <p>$29.99<span>/month</span></p>
            </div>
            <div className="card-body">
              <ul>
                <li>Access to all pro features</li>
                <li>AI-Powered Task Optimization</li>
                <li>Personal AI Assistant</li>
                <li>Chatbot with Premium Features</li>
                <li>Exclusive Access to Beta Features</li>
              </ul>
              <Link className="choose-plan-btn" to="/payment">Choose Plan</Link>
            </div>
          </div>
        </div>
      </div>
    </div> 
    </>
  ); 
  
} 

