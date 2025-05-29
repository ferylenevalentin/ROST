import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import './Sidebar.css'; // Import the CSS file for styling
import GroupIcon from '@mui/icons-material/Group'; // Manage Users icon
import InventoryIcon from '@mui/icons-material/Inventory'; // Manage Products icon
import LogoutIcon from '@mui/icons-material/Logout'; // Logout icon
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import logo from '../img/logo.png'; // Adjust the path to your logo image

const Sidebar = () => {
    const navigate = useNavigate(); // Initialize useNavigate for routing

    const handleLogout = () => {
        const confirmLogout = window.confirm("Do you really want to logout?");
        if (confirmLogout) {
            navigate('/'); // Redirect to the login page
        }
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <img src={logo} alt="ROST Logo" className="sidebar-logo" />
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <Link to="/users">
                        <GroupIcon className="sidebar-icon" /> Manage Users
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/manage-products">
                        <InventoryIcon className="sidebar-icon" /> Manage Products
                    </Link>
                </li>
                
                <li className="sidebar-item">
                    <button className="logout-button" onClick={handleLogout}>
                        <LogoutIcon className="sidebar-icon" /> Logout
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;