import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import logo from '../img/logo.png'; // Adjust the path to your logo image

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={logo} alt="ROST Logo" className="navbar-logo" />
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <ScrollLink to="home" smooth={true} duration={500}>
                            Home
                        </ScrollLink>
                    </li>
                    <li className="navbar-item">
                        <ScrollLink to="about" smooth={true} duration={500}>
                            About
                        </ScrollLink>
                    </li>
                    <li className="navbar-item">
                        <RouterLink to="/menu">
                            Menu
                        </RouterLink>
                    </li>
                    <li className="navbar-item">
                        <ScrollLink to="location" smooth={true} duration={500}>
                            Location
                        </ScrollLink>
                    </li>
                    <li className="navbar-item">
                        <ScrollLink to="footer" smooth={true} duration={500}>
                            Social Media
                        </ScrollLink>
                    </li>
                    <li className="login-item">
                        <RouterLink to="/login">
                            .
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;