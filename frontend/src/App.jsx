import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetProducts from "./components/GetProducts";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetProducts />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
