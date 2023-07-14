import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import cateRouter from "./src/routers/category.js";
import productRouter from "./src/routers/product.js";
import userRouter from "./src/routers/user.js";
import authRouter from "./src/routers/auth.js";

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

// connect database
connectDB(process.env.MONGO_URL || "");

// middleware
app.use(express.json());
app.use(morgan("shopxedap"));
app.use(cors());

// routes
app.use("/api", cateRouter)
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
