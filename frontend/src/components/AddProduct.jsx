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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price:</label>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category:</label>
            <input
              type="text"
              name="category"
              placeholder="Enter product category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Brand:</label>
            <input
              type="text"
              name="brand"
              placeholder="Enter product brand"
              value={product.brand}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Rating:</label>
            <input
              type="number"
              name="rating"
              placeholder="Enter product rating (1-5)"
              value={product.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Product
            </button>
            <Link to="/">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
