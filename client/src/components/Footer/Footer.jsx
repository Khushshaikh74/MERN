import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="custom-footer">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a href="#" className="footer-link">Branding</a>
        <a href="#" className="footer-link">Design</a>
        <a href="#" className="footer-link">Marketing</a>
        <a href="#" className="footer-link">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a href="/about" className="footer-link">About us</a>
        <a href="/contact" className="footer-link">Contact</a>
        <a href="#" className="footer-link">Jobs</a>
        <a href="#" className="footer-link">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a href="#" className="footer-link">Terms of use</a>
        <a href="#" className="footer-link">Privacy policy</a>
        <a href="#" className="footer-link">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
    