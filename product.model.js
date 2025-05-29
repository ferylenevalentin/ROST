const mongoose = require('mongoose');

// Define the Product schema
const ProductSchema = new mongoose.Schema(
  {
    
    name: { 
      type: String, 
      required: true, 
      trim: true // Removes whitespace
    },
    description: { 
      type: String, 
      required: true, 
      trim: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 // Ensures price is positive
    },
    photo: { 
      type: String, 
      required: true, 
      trim: true // URL for the product image
    },
    type: { 
      type: String, 
      required: true, 
      trim: true // Category or type of product
    },
    available: { 
      type: Boolean, 
      default: true // Indicates if the product is available
    }
  },
  {
    collection: 'product-data', // Specifies the collection name
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Product model
module.exports = mongoose.model('Product', ProductSchema);