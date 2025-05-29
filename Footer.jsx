import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import { Facebook, Twitter, Instagram } from '@mui/icons-material'; // Import MUI icons

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h1>ROST</h1>
                    <p>Where Freshly Roasted Coffee Beans Meets Bread & Pastries</p>
                </div>
                <div className="footer-social">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook className="social-icon" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="social-icon" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Instagram className="social-icon" />
                    </a>
                </div>
                <div className="footer-contact">
                    <p>Email: contact@rost.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Coffee Lane, Roast City</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;