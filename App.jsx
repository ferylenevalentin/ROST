import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import Menu from './pages/Menu';
import Admin from './pages/Admin';
import User from './pages/User';
import Product from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu'; // Import Menu component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for the Dashboard */}
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<User />} /> 
          <Route path="/manage-products" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<Menu />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;