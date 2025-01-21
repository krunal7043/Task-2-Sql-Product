import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id: productId } = useParams();  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [productId]);

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
      .then((response) => alert(response.data))
      .catch((error) => console.error(error));
  };

  if (!product) return <p>NO Product</p>;

  return (
    <div className="container">
      <h3>Update Product</h3>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Category: </label>
          <input
            type="text"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Brand: </label>
          <input
            type="text"
            value={product.brand}
            onChange={(e) =>
              setProduct({ ...product, brand: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Rating: </label>
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
          />
        </div>
        <div>
          <label>Image: </label>
          <input
            type="file"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
