import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import filterProducts from "./filterProducts";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000); 
  const [dynamicMaxPrice, setDynamicMaxPrice] = useState(10000); 
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/get")
      .then((response) => {
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);

        const maxPrice = Math.max(
          ...fetchedProducts.map((product) => product.price)
        );
        setDynamicMaxPrice(maxPrice);
        setMaxPrice(maxPrice); 
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch products!");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateClick = async (id) => {
    try {
      fetchProducts();
      navigate(`/edit/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update the product!");
    }
  };

  const filteredProducts = filterProducts(
    products,
    searchQuery,
    selectedCategory,
    maxPrice
  );

  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value)); 
  };

  return (
    <div className="p-7">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Category filter */}
      <div className="mb-5">
        <button
          onClick={() => setSelectedCategory("")}
          className="px-4 py-2 mr-4 bg-gray-300 text-black rounded-lg hover:bg-gray-500"
        >
          All Products
        </button>
        <button
          onClick={() => setSelectedCategory("Mobile")}
          className="px-4 py-2 mr-4 bg-gray-300 text-black rounded-lg hover:bg-gray-500"
        >
          Mobile
        </button>
        <button
          onClick={() => setSelectedCategory("Laptop")}
          className="px-4 py-2 mr-4 bg-gray-300 text-black rounded-lg hover:bg-gray-500"
        >
          Laptop
        </button>
        <button
          onClick={() => setSelectedCategory("Watch")}
          className="px-4 py-2 mr-4 bg-gray-300 text-black rounded-lg hover:bg-gray-500"
        >
          Watch
        </button>
      </div>

      {/* Price filter */}
      <div className="mb-5">
        <h3>Price: {maxPrice} ₹</h3>
        <h4 className="text-center">
          {" "}
          Total Product: {filteredProducts.length}
        </h4>
        <input
          type="range"
          min="0"
          max={dynamicMaxPrice}
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-1/12"
        />
      </div>

      {/* Search filter and Add Button */}
      <div className="flex justify-between mb-5">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border rounded-lg w-10/12 border-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to="/add">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
            Add Product
          </button>
        </Link>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-3xl  ">
          No products found for this price range
        </div>
      ) : (
        <div className="pl-40 pr-40 grid grid-cols-5 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {product.rating}⭐
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold">{product.name}</h4>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-lg font-semibold">{product.price} ₹</p>
              </div>
              <div className="p-4 flex justify-between">
                <button
                  onClick={() => handleUpdateClick(product.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                >
                  Update
                </button>
                <DeleteProduct id={product.id} deleteRefresh={fetchProducts} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetProducts;
