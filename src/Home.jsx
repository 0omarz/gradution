import React from 'react';
import './Home.css';
import welcomeImage1 from './images/welcome1.png'; // Replace with your image path
import welcomeImage2 from './images/welcome2.png'; // Replace with your image path
import user1 from './images/user1.png'; // Replace with user image paths
import user2 from './images/user2.png';
import user3 from './images/user3.png'; 
import ImageSlider from './ImageSlider';
import Footer from './Footer';

export default function Home() {
  return ( 
    <>
    <div className="home-container">
      <div className="welcome-section row">
        <div className='col-lg-7'> 
          <div className="welcome-text">
            <h1>Welcome to Lessa Assistant</h1>
            <p>Your personal assistant for managing tasks, schedules, and events.</p>
            <button className="get-started-btn">Get Started</button>
          </div>  
        </div>
        <div className='col-lg-5'>  
          <div className="welcome-image">
            <img src={welcomeImage1} alt="Welcome" />
          </div>
        </div>
      </div>
      
      <div className="about-section">
        <div className="about-image">
          <img src={welcomeImage2} alt="Assistant" />
        </div>
        <div className="about-text">
          <h2>Lessa Assistant</h2>
          <p>
            Lessa Assistant is your all-in-one solution for staying organized, productive, and on top of your busy life.
            Whether you're managing tasks, scheduling events, or simply need a helping hand to keep things running smoothly,
            Lessa Assistant is here to assist you every step of the way.
          </p>
        </div>
      </div>
      
      <div className="separator"></div> {/* Separator line */}

      <div className="social-proof-section">
        <h2>10,000+ of our users love Lessa .</h2>
        <p>We provide outstanding features combined with excellent customer service. See what our satisfied customers are saying about our assistant</p>
        <div className="reviews">
          <div className="review">
            <img src={user1} alt="User 1" />
            <span className="user-name">Colton Smith</span>
            <p className="user-role">Verified Buyer</p>
            <p className="user-review">"Lessa Ai has completely transformed how I manage my day-to-day tasks. The AI-powered reminders and chatbot assistance ensure I never miss a deadline. Highly recommend the Pro Plan for anyone serious about productivity!"</p>
          </div>
          <div className="review">
            <img src={user2} alt="User 2" />
            <span className="user-name">Irene Roberts</span>
            <p className="user-role">Verified Buyer</p>
            <p className="user-review">"Lessa Ai Lessa's enterprise-grade security gives me peace of mind knowing my data is safe. The AI-powered task optimization is fantastic, and the chatbot helps me stay on top of my workload. I can't imagine working without it now."</p>
          </div>
          <div className="review">
            <img src={user3} alt="User 3" />
            <span className="user-name">Anne Wallace</span>
            <p className="user-role">Verified Buyer</p>
            <p className="user-review">"I started with the Basic Plan and quickly upgraded to the Pro Plan. The task management features and chatbot support are fantastic. Lessa Ai Lessa helps me prioritize my tasks and manage my time effectively. It's like having a personal assistant at my fingertips!"</p>
          </div>
        </div> 
        <div className="separator"></div>
      </div>  
      <ImageSlider />
      {/* new section */} 
      <div className="separator"></div> {/* Separator line */}

       <div className="magic-task-section">
      <h1 className="section-title">Lessa's Magic Task Management</h1>
      <p className="section-subtitle">Discover the Secrets Behind Lessa's AI-Powered Task Mastery</p>
      <div className="features-grid">
        <div className="feature-card">
          <h2 className="feature-title">Smart AI</h2>
          <p className="feature-description">Lessa's AI predicts your next move, like a psychic on steroids!</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Chat Bot</h2>
          <p className="feature-description">Chat with Lessa, the sassiest bot this side of the internet!</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Efficiency Guru</h2>
          <p className="feature-description">Effortlessly conquer tasks faster than a cheetah on caffeine!</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Productivity Beast</h2>
          <p className="feature-description">Unleash your inner productivity beast with Lessa by your side!</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Task Whisperer</h2>
          <p className="feature-description">Lessa whispers task secrets in your ear, making you the office hero!</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Time Savior</h2>
          <p className="feature-description">Save time with Lessa, the time-traveling task terminator!</p>
        </div>
      </div>
    </div> 
    <div className="separator"></div>
    <div className="meet-lessa-section">
      <div className="meet-lessa-card">
        <h1 className="meet-lessa-title">Meet Lessa</h1>
        <p>Welcome to the future of task management! Lessa, your AI companion, is here to revolutionize the way you tackle your to-dos.
        <hr /> 
        Say goodbye to procrastination and hello to productivity with Lessa by your side. Let's make task management fun and effortless!
        <hr />   
        Lessa is not just a chat bot; it's your personal task wizard, ready to assist you in conquering your daily challenges. Get ready to level up your productivity game with Lessa!</p>
      </div>
    </div> 
    <div className="contact-form-container">
      <h2>Get in Touch</h2>
      <form className="contact-form">
        <div className="input-row">
          <input type="text" placeholder="Name" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
        </div>
        <input type="text" placeholder="Phone" className="input-field" />
        <textarea placeholder="Message" className="input-field" rows="4"></textarea>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div> 
    
    
    </div> 
    <Footer/> 
    </>
  );
}
