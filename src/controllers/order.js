import Order from "../models/order.js";
import User from "../models/user.js";

// Thêm Giỏ hàng
export const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'name price');
    const products = userCart?.cart?.map(el => ({
      product: el.product._id,
      count: el.quantity,
      color: el.color
    }));
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
    const createData = { products, total, orderBy: _id };
    const response = await Order.create(createData);
    return res.json({
      success: response ? 'Thêm Order thành công' : false,
      response: response ? response : 'Ko thêm Order được!!'
    });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Có lỗi xảy ra: ' + error.message
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) throw new Error('Yeu cau trang thai');
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
    return res.json({
      success: response ? 'Thêm trạng thái thành công' : false,
      response: response ? response : 'Ko thêm trạng thái được!!'
    });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Có lỗi xảy ra: ' + error.message
    });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const response = await Order.find({ orderBy: _id });
    return res.json({
      success: response ? 'Hiển thị Order thành công' : false,
      response: response ? response : 'Ko hiển thị Order được!!'
    });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Có lỗi xảy ra: ' + error.message
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const response = await Order.find();
    return res.json({
      success: response ? 'Hiển thi Order thành công' : false,
      response: response ? response : 'Ko hiển thị Order được!!'
    });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Có lỗi xảy ra: ' + error.message
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { oid } = req.params;
    const response = await Order.findByIdAndDelete(oid);
    return res.json({
      success: response ? 'Xóa Order thành công' : false,
      response: response ? response : 'Không xóa Order được!!'
    });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Có lỗi xảy ra: ' + error.message
    });
  }
};
