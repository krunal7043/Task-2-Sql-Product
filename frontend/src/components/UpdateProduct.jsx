import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [productId]);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("rating", product.rating);
    if (product.image instanceof File) {
      formData.append("image", product.image);
    } else {
      formData.append("image", product.image);
    }

    axios
      .put(`http://localhost:5000/edit/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Product updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update product. Please try again.");
      });
  };

  if (!product) return <p>NO Product....</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">Update Product</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name:{" "}
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price:{" "}
            </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category:{" "}
            </label>
            <input
              type="text"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Brand:{" "}
            </label>
            <input
              type="text"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rating:{" "}
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={product.rating}
              onChange={(e) =>
                setProduct({ ...product, rating: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image:{" "}
            </label>
            <input
              type="file"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files[0] })
              }
            />
            {product.image && typeof product.image === "string" && (
              <p className="text-sm text-gray-600 mt-2">
                Current Image: {product.image}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update Product
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

export default UpdateProduct;
