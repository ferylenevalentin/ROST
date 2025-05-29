import React, { useState, useEffect } from 'react';
import './Menu.css';
import Navbar from './Navbar.jsx';
import axios from 'axios'; // Import Axios for API calls

function Menu() {
  const [products, setProducts] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [activeFilter, setActiveFilter] = useState('All'); // State to track the active filter

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/products'); // Replace with your backend URL
      const availableProducts = response.data.filter((product) => product.available); // Filter only available products
      setProducts(availableProducts);
      setFilteredProducts(availableProducts); // Initially show all available products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Filter products based on type
  const handleFilter = (type) => {
    setActiveFilter(type); // Set the active filter
    if (type === 'All') {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter((product) => product.type === type);
      setFilteredProducts(filtered); // Show products matching the selected type
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 0 }}>
        <div className="menu-header-row">
          <div className="menu-title">MENU</div>
          <div className="menu-icons">
            <span
              className={`menu-icon-circle ${activeFilter === 'All' ? 'active' : ''}`}
              onClick={() => handleFilter('All')}
            >
              <img src="\src\img\list.png" alt="All Products" />
              
            </span>
            <span
              className={`menu-icon-circle ${activeFilter === 'Iced Coffee' ? 'active' : ''}`}
              onClick={() => handleFilter('Iced Coffee')}
            >
              <img src="\src\img\coffee.png" alt="Iced Coffee" />
            </span>
            <span
              className={`menu-icon-circle ${activeFilter === 'Hot Coffee' ? 'active' : ''}`}
              onClick={() => handleFilter('Hot Coffee')}
            >
              <img src="\src\img\mug-hot-alt.png" alt="Hot Coffee" />
            </span>
            <span
              className={`menu-icon-circle ${activeFilter === 'Soda' ? 'active' : ''}`}
              onClick={() => handleFilter('Soda')}
            >
              <img src="\src\img\drink-alt.png" alt="Soda" />
            </span>
            <span
              className={`menu-icon-circle ${activeFilter === 'Snacks' ? 'active' : ''}`}
              onClick={() => handleFilter('Snacks')}
            >
              <img src="\src\img\burger-fries.png" alt="Snacks" />
            </span>
            <span
              className={`menu-icon-circle ${activeFilter === 'Noodles' ? 'active' : ''}`}
              onClick={() => handleFilter('Noodles')}
            >
              <img src="\src\img\bowl-chopsticks-noodles.png" alt="Pasta and Noodles" />
            </span>
            <span
              className={`menu-icon-circle ${activeFilter === 'Sandwich' ? 'active' : ''}`}
              onClick={() => handleFilter('Sandwich')}
            >
              <img src="\src\img\sandwich.png" alt="Sandwich" />
            </span>
            <span
              className={`menu-icon-circle ${activeFilter === 'Dessert' ? 'active' : ''}`}
              onClick={() => handleFilter('Dessert')}
            >
              <img src="\src\img\cheese-cake.png" alt="Dessert" />
            </span>
          </div>
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.map((product, idx) => (
          <div className="product-card" key={idx}>
            <img src={`http://localhost:1337${product.photo}`} alt={product.name} />
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">₱{product.price.toFixed(2)}</span>
            </div>
            <div className="product-description">{product.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;