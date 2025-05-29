import React, { useState, useEffect } from "react";
import "./User.css"; // Import the CSS file for styling
import Sidebar from "./Sidebar"; // Import the Sidebar component
import axios from "axios"; // Import Axios for API calls
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon

const User = () => {
    const [users, setUsers] = useState([]); // State to store user data
    const [editUser, setEditUser] = useState(null); // State to store the user being edited
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to toggle edit modal
    const [username, setUsername] = useState(""); // State for editing username
    const [password, setPassword] = useState(""); // State for editing password

    // Fetch users from the backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:1337/api/users"); // Replace with your backend URL
            setUsers(response.data); // Update the state with the fetched user data
        } catch (error) {
            console.error("Error fetching users:", error); // Log any errors
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:1337/api/users/${userId}`); // Replace with your backend delete route
            fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
            console.error("Error deleting user:", error); // Log any errors
        }
    };

    const handleEdit = (user) => {
        setEditUser(user); // Set the user to be edited
        setUsername(user.username); // Pre-fill the username
        setPassword(user.password); // Pre-fill the password
        setIsEditModalOpen(true); // Open the edit modal
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1337/api/users/${editUser._id}`, {
                username,
                password,
            }); // Replace with your backend update route
            setIsEditModalOpen(false); // Close the modal
            fetchUsers(); // Refresh the user list after editing
        } catch (error) {
            console.error("Error updating user:", error); // Log any errors
        }
    };

    return (
        <div className="user-page">
            <Sidebar /> 
            <div className="user-content">
                <h2 className="user-table-title">User List</h2>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>MongoDB ID</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th> {/* Add Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <button
                                            className="action-button edit-button"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            className="action-button delete-button"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No users available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsEditModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;