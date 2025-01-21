import express from "express";
import { addProduct, getProducts, deleteProduct, updateProduct, getProductById } from "../Controllers/productCtrl.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Product Routes
router.post("/add", upload.single("image"), addProduct);  
router.get("/get", getProducts);                         
router.delete("/delete/:id", deleteProduct);             
router.put("/edit/:id", upload.single("image"), updateProduct);
router.get("/get/:id", getProductById);


export default router;
