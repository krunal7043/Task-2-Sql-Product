import { connectDB } from "../Config/db.js";

// Get all products
export const getProducts = (req, res) => {
  const db = connectDB();
  const query = "SELECT * FROM products";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Add product
export const addProduct = (req, res) => {
  const { name, price, category, brand, rating } = req.body;
  // console.log(req.file);

  const image = req.file ? `${req.file.filename}` : null;

  const query = `INSERT INTO products (name, image, price, category, brand, rating) VALUES (?)`;
  const values = [name, image, price, category, brand, rating];

  const db = connectDB();
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product has been added successfully.");
  });
};

// Delete product
export const deleteProduct = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM products WHERE id = ?";

  const db = connectDB();
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product has been deleted successfully.");
  });
};

// Update product
export const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, category, brand, rating } = req.body;
  const image = req.file ? `${req.file.filename}` : req.body.image;

  const query =
    "UPDATE products SET `name` = ?, `image` = ?, `price` = ?, `category` = ?, `brand` = ?, `rating` = ? WHERE id = ?";
  const values = [name, image, price, category, brand, rating, id];

  const db = connectDB();
  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Product has been updated successfully.");
  });
};

// get by id
export const getProductById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM products WHERE id = ?";

  const db = connectDB();
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    return res.json(results[0]);
  });
};
