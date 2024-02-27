import asyncHandler from "express-async-handler";
import User from "../model/authModel.js";
import Product from "../model/productModel.js";

export const addProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    product_desc,
    product_stock,
    product_price,
    product_discount,
    category_name,
  } = req.body;
  const { _id } = req.params;
  const product_images = req.file ? req.file.filename : null;
  const user = await User.findById(_id);

  try {
    if (
      !product_name ||
      !product_desc ||
      !product_price ||
      !product_stock ||
      !product_discount ||
      !category_name
    ) {
      return res.status(200).json({
        status: 400,
        message: `${
          !product_name
            ? "product name"
            : !product_desc
            ? "product Description"
            : !product_stock
            ? "product stock"
            : !product_price
            ? "price"
            : !product_discount
            ? "product discount"
            : !category_name
            ? "category name"
            : ""
        } is required`,
      });
    } else if (!user) {
      return res.status(200).json({ status: 400, message: "User not found" });
    } else if (!product_images) {
      return res
        .status(200)
        .json({ status: 400, message: "Product Images are required" });
    } else {
      const data = await Product.create({
        product_name,
        product_desc,
        product_stock,
        product_price,
        product_discount,
        category_name,
      });
      return res
        .status(200)
        .json({ status: 200, message: "Product added", data });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ status: 500, message: "internal server error", error });
  }
});

export const getAddProduct = asyncHandler(async (req, res) => {
  try {
    const data = await Product.find();
    return res.status(200).json({ status: 200, message: "data found", data });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 500, message: "internal server error", error });
  }
});
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const data = await Product.findById(_id);
  try {
    if (!data) {
      return res.status(200).json({ status: 400, message: "no data found" });
    } else {
      return res.status(200).json({ status: 200, message: "data found", data });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ status: 500, message: "internal server error", error });
  }
});
