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
      <button onClick={handleDeleteClick}>Delete</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this product?</p>
            <span className="modal-button" onClick={handleConfirmDelete}>
              Yes
            </span>
            <span className="modal-button" onClick={handleCancelDelete}>
              No
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteProduct;
