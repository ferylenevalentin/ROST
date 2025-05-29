import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; 
import Location from './Location';
import About from './About';
import './Dashboard.css';

import hero from '../img/hero.png'; // Adjust the path based on your folder structure

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            {/* Hero Section */}
            <div id="home" className="landing-container">
                <img
                    src={hero}
                    alt="Hero"
                    className="banner-bg"
                />
            </div>
            {/* Content Section */}
            <section className="dashboard-content">
                <div className="dashboard-card">
                    <h2>Menu Management</h2>
                    <p>Create, update, and delete menu items.</p>
                </div>
                <div className="dashboard-card">
                    <h2>User Management</h2>
                    <p>Manage user accounts and permissions.</p>
                </div>
                <div className="dashboard-card">
                    <h2>Restaurant Details</h2>
                    <p>Update restaurant information and social media links.</p>
                </div>
            </section>
            {/* About Section */}
            <div id="about">
                <About />
            </div>
            <br/>
            {/* Location Section */}
            <div id="location">
                <Location />
            </div>
            <br/>
            {/* Footer Section */}
            <div id="footer">
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;