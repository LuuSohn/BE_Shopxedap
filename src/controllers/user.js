import User from "../models/user.js";



export const getUserProfile = async (req, res) => {
  try {
    const populateOptions = [
      {
        path: "cart.productId",
        select: "name price image",
      },
    ];

    const user = await User.findById(req.user?._id).populate(populateOptions);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin người dùng" });
    }

    return res
      .status(200)
      .json({ message: "Lấy thông tin người dùng thành công!", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    const userDate = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, userDate, {
      new: true,
    });

    return res.status(200).json({
      message: "Cập nhật thông tin người dùng thành công!",
      updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cập nhật tài khoản thất bại!", error: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { pid, quantity, color } = req.body;
    if (!pid || !quantity || !color) {
      throw new Error('Ko được để trống !');
    }

    const user = await User.findById(_id).select('cart');
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid);

    if (alreadyProduct) {
      if (alreadyProduct.color === color) {
        const response = await User.updateOne(
          { cart: { $elemMatch: alreadyProduct } },
          { $set: { "cart.$.quantity": quantity } },
          { new: true }
        );

        return res.status(200).json({
          success: response ? true : false,
          updatedUser: response ? response : 'Some thing went wrong'
        });
      } else {
        const response = await User.findByIdAndUpdate(
          _id,
          { $push: { cart: { product: pid, quantity, color } } },
          { new: true }
        );

        return res.status(200).json({
          success: response ? true : false,
          updatedUser: response ? response : 'Some thing went wrong'
        });
      }
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      );

      return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Cập nhật tài khoản thất bại!",
      error: error.message
    });
  }
}
