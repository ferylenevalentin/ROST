import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Admin.css'; // Import the CSS file for additional styling

const Admin = () => {
    return (
        <div className="admin-page">
            <Sidebar /> {/* Display the Sidebar */}
            <div className="admin-content">
                <h1>Welcome to the Admin Dashboard</h1>
                
            </div>
        </div>
    );
};

export default Admin;