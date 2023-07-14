import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import cateRouter from "./src/routers/category.js";
import productRouter from "./src/routers/product.js";
const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

// connect database
connectDB(process.env.MONGO_URL || "");

// middleware
app.use(express.json());
app.use(morgan("shopxedap"));
app.use(cors());

app.use("/api", cateRouter)
app.use("/api", productRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
