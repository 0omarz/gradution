import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Lessa Assistant</h2>
        <p>Empowering you to manage your tasks efficiently and effectively.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <p>&copy; 2024 Lessa Assistant. All rights reserved.</p>
      </div>
    </footer>
  );
}
