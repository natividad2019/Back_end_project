const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API server Updated");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}); // Corrected variable name from product to products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Corrected route definition for handling POST requests to "/api/products"
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product); // Changed status code to 201 for successful creation
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://briggs2019:Kim&Dennis$2019@backenddb.efh0gay.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB",
    { useNewUrlParser: true, useUnifiedTopology: true } // Added options to MongoClient constructor
  )
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => { // Added error parameter to catch block
    console.log("Connection failed!", error); // Included error parameter in console.log
  });
