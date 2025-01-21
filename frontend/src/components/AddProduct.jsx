import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    category: "",
    brand: "",
    rating: "",
  });


  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.image ||
      !product.category ||
      !product.brand ||
      !product.rating
    ) {
      toast.error("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("rating", product.rating);

    try {
      await axios.post("http://localhost:5000/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add the product. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            placeholder="Enter product category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            placeholder="Enter product brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="Enter product rating (1-5)"
            value={product.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default AddProduct;
