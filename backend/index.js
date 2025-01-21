import express from "express";
import cors from "cors";
import router from "./Routes/productRoute.js";
import { connectDB } from "./Config/db.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/", router);

app.listen(5000, () => console.log("Server started on port 5000"));
