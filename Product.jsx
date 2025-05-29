import React, { useState, useEffect } from 'react';
import './Product.css'; // Import the CSS file for styling
import Sidebar from './Sidebar'; // Import the Sidebar component
import axios from 'axios'; // Import Axios for API calls
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon

const Product = () => {
    const [products, setProducts] = useState([]); // Initialize products state as an empty array
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        available: true,
        type: '', // Add type field
    });
    const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file
    const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal visibility
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to toggle edit modal visibility
    const [editProduct, setEditProduct] = useState(null); // State to store the product being edited

    // Fetch products from the backend
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/products'); // Ensure the URL matches your backend
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error('API response is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('available', newProduct.available);
        formData.append('type', newProduct.type); // Add type field
        if (imageFile) {
            formData.append('photo', imageFile);
        }

        try {
            await axios.post('http://localhost:1337/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setIsModalOpen(false);
            setNewProduct({
                name: '',
                description: '',
                price: '',
                available: true,
                type: '',
            });
            setImageFile(null);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setNewProduct({
            name: product.name,
            description: product.description,
            price: product.price,
            available: product.available,
            type: product.type,
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('available', newProduct.available);
        formData.append('type', newProduct.type); // Add type field
        if (imageFile) {
            formData.append('photo', imageFile);
        }

        try {
            await axios.put(`http://localhost:1337/api/products/${editProduct._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setIsEditModalOpen(false);
            setEditProduct(null);
            setImageFile(null);
            fetchProducts();
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:1337/api/products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-page">
            <Sidebar /> {/* Include the Sidebar */}
            <div className="product-content">
                <div className="product-header">
                    <h2 className="product-table-title">Product List</h2>
                    <button
                        className="add-product-button"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Product
                    </button>
                </div>
                <div className="table-container"> {/* Add scrollable container */}
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Type</th>
                                <th>Availability</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>₱{product.price.toFixed(2)}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:1337${product.photo}`}
                                                alt={product.name}
                                                className="product-photo"
                                            />
                                        </td>
                                        <td>{product.type}</td>
                                        <td>{product.available ? 'Available' : 'Not Available'}</td>
                                        <td>
                                            <button
                                                className="action-button edit-button"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                className="action-button delete-button"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No products available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Adding Product */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Product</h2>
                        <form className="add-product-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                            <select
                                name="type"
                                value={newProduct.type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Hot Coffee">Hot Coffee</option>
                                <option value="Iced Coffee">Iced Coffee</option>
                                <option value="Soda">Soda</option>
                                <option value="Noodles">Noodles</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                            <select
                                name="available"
                                value={newProduct.available}
                                onChange={handleInputChange}
                                required
                            >
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                            </select>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                            <button type="submit" className="add-product-button">
                                Save Product
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Editing Product */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Product</h2>
                        <form className="add-product-form" onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                            <select
                                name="type"
                                value={newProduct.type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Hot Coffee">Hot Coffee</option>
                                <option value="Iced Coffee">Iced Coffee</option>
                                <option value="Soda">Soda</option>
                                <option value="Noodles">Noodles</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                            <select
                                name="available"
                                value={newProduct.available}
                                onChange={handleInputChange}
                                required
                            >
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                            </select>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button type="submit" className="add-product-button">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;