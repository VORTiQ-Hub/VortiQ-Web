import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section address">
          <h3>Address</h3>
          <p>123 Street, New York, USA</p>
          <p>+012 345 67890</p>
          <p>info@example.com</p>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Terms & Condition</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div className="footer-section project-gallery">
          <h3>Project Gallery</h3>
          <div className="gallery">
            <img src="image1.jpg" alt="Project 1" />
            <img src="image2.jpg" alt="Project 2" />
            <img src="image3.jpg" alt="Project 3" />
            <img src="image4.jpg" alt="Project 4" />
            <img src="image5.jpg" alt="Project 5" />
            <img src="image6.jpg" alt="Project 6" />
          </div>
        </div>
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">SignUp</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Your Site Name, All Right Reserved.</p>
        <p>Designed By <a href="#">HTML Codex</a>, Distributed By <a href="#">ThemeWagon</a></p>
      </div>
    </footer>
  );
};

export default Footer;
