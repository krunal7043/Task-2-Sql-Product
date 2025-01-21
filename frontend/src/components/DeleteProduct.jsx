import React, { useState } from "react";
import axios from "axios";

function DeleteProduct({ id, deleteRefresh }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`).then(() => {
        deleteRefresh();
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <p className="text-lg font-medium mb-4 text-center">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteProduct;
