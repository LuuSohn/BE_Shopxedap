import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/product.js";

const router = Router();

// Lấy tất cả sản phẩm
router.get("/products", getProducts);

// Lấy sản phẩm theo id
router.get("/products/:id", getProduct);

// Thêm sản phẩm
router.post("/products" ,addProduct);

// Sửa sản phẩm
router.put("/products/:id" ,editProduct);

// Xóa sản phẩm
router.delete("/products/:id" ,deleteProduct);

export default router;
