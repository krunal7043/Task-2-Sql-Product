import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";

const GetProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/get")
      .then((response) => {
        setProducts(response.data);
        // console.log("Frontend", response);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
// Datatable initialization
  useEffect(() => {
    if (products.length > 0) {
      $(document).ready(function () {
        $("#productTable").DataTable();
      });
    }
    // console.log(products);
  }, [products]);

  return (
    <div>
      <h3>Products List</h3>
      <table id="productTable" className="display">
        <thead>
          <tr>
            <th style={styles.container}>Index</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th style={styles.container}>Price</th>
            <th style={styles.container}> Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product, index) => (
              <tr key={product.id}>
                <td style={styles.container}>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    width="50"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td style={styles.container}>{product.price} ₹</td>
                <td style={styles.container}>{product.rating}</td>
                <td>
                  <DeleteProduct
                    id={product.id}
                    deleteRefresh={fetchProducts}
                  />
                  <button className="btn btn-warning">Update</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/add">
        <button>Add Product</button>
      </Link>
    </div>
  );
};
const styles = {
  container: {
    textAlign: "left",
  },
};
export default GetProducts;
