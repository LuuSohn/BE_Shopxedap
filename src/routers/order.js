import { Router } from "express";
import {
    createOrder,
    getAllOrders,
    getUserOrder,
    deleteOrder,
    updateStatus
  
} from "../controllers/order.js";

import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

// Lấy tất cả sản phẩm
router.get("/order", getUserOrder);

// Lấy sản phẩm theo id
router.get("/order/admin",getAllOrders);

// Thêm sản phẩm
router.post("/order" ,authenticate ,createOrder);

// Sửa sản phẩm
router.put("/order/status/:oid" ,authenticate, authorization ,updateStatus);

// Xóa sản phẩm
router.delete("/order/:oid" ,authenticate ,deleteOrder);

export default router;
