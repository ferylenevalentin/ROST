const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Product = require("./models/product.model");
const User = require("./models/user.model");

const app = express();
const port = 1337;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Rost", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// --- Product Routes ---

// Get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        console.log("Products fetched:", products); // Debugging
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: err.message });
    }
});
// Add a new product
app.post("/api/products", upload.single("photo"), async (req, res) => {
  try {
      const { name, description, price, available, type } = req.body;

      if (!name || !description || !price || !type) {
          return res.status(400).json({ error: "All fields are required." });
      }

      if (price <= 0) {
          return res.status(400).json({ error: "Price must be a positive number." });
      }

      const photo = req.file ? `/uploads/${req.file.filename}` : "";
      if (!photo) {
          return res.status(400).json({ error: "Product photo is required." });
      }

      const newProduct = new Product({
          name,
          description,
          price,
          photo,
          available: available === "true",
          type,
      });
      await newProduct.save();
      res.json(newProduct);
  } catch (err) {
      console.error("Error saving product:", err);
      res.status(400).json({ error: err.message });
  }
});
// Update a product
app.put("/api/products/:id", upload.single("photo"), async (req, res) => {
  try {
      const { name, description, price, available, type } = req.body;

      // Validate required fields
      if (!name || !description || !price || !type) {
          return res.status(400).json({ error: "All fields are required." });
      }

      // Validate price
      if (price <= 0) {
          return res.status(400).json({ error: "Price must be a positive number." });
      }

      // Handle photo upload
      const updateData = { name, description, price, available: available === "true", type };
      if (req.file) {
          updateData.photo = `/uploads/${req.file.filename}`;
      }

      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.json(updatedProduct);
  } catch (err) {
      console.error("Error updating product:", err);
      res.status(400).json({ error: err.message });
  }
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Signup route
// Signup route (Add a new user)
app.post("/api/signup", async (req, res) => {
  try {
      const { username, password } = req.body;

      // Validate required fields
      if (!username || !password) {
          return res.status(400).json({ error: "Username and password are required." });
      }

      

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ error: "Username already exists." });
      }

      // Create and save the new user
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json(newUser);
  } catch (err) {
      console.error("Error signing up:", err);
      res.status(500).json({ error: err.message });
  }
});

// Update a user
app.put("/api/users/:id", async (req, res) => {
try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    
    
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, password },
        { new: true }
    );
    if (!updatedUser) {
        return res.status(404).json({ error: "User not found." });
    }
    res.json(updatedUser);
} catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
}
});

app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username and password
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({ success: true, message: "Login successful", user });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: err.message });
    }
});
app.delete("/api/users/:id", async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ success: true });
  } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: err.message });
  }
});
app.put("/api/users/:id", async (req, res) => {
  try {
      const { username, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { username, password },
          { new: true }
      );
      res.json(updatedUser);
  } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: err.message });
  }
});
// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});