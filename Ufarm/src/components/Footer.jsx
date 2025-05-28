import React from 'react';

const Footer = ({ showPage }) => {
  const handleNavClick = (e, page) => {
    e.preventDefault();
    showPage(page);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem('email');
    if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing with ${emailInput.value}`);
        emailInput.value = ''; 
    } else {
        alert('Please enter your email address');
    }
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/images/logo.jpg" alt="Urban Harvest Hub Logo" className="logo" />
          <h2>URBAN HARVEST HUB</h2>
        </div>
        <div className="footer-links">
          <h3>Site Links</h3>
          <ul>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'homepage')}>Home</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'produce')}>Produce</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'farms')}>Farms</a></li>
            <li><a href="#" onClick={(e) => handleNavClick(e, 'about')}>About Us</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <p>Stay updated on seasonal produce and events</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" name="email" placeholder="Your email address" required/>
            <button type="submit" className="btn btn-primary">SUBSCRIBE</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Urban Harvest Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;