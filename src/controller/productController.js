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
  const product_images = req.files.map((file) => ({
    filename: file.filename,
    url: `${process.env.BASE_URL}uploads/` + file.filename,
  }));
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
        product_images,
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

export const deleteProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const data = await Product.findByIdAndDelete(_id);
  try {
    if (!data) {
      return res.status(200).json({ status: 400, message: "no data found" });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "Successfuly deleted", data });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ status: 500, message: "internal server error", error });
  }
});

/*
export const updateProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const {
    product_name,
    product_desc,
    product_stock,
    product_price,
    product_discount,
    category_name,
  } = req.body;

  const data = await Product.findByIdAndUpdate(_id);
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
    } else if (!data) {
      return res.status(200).json({ status: 400, message: "no data found" });
    }

    else {
      await Product.save();
      return res
        .status(200)
        .json({ status: 200, message: "data updated", data });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ status: 500, message: "internal server error", error });
  }
});
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const {
    product_name,
    product_desc,
    product_stock,
    product_price,
    product_discount,
    category_name,
  } = req.body;
  const product_images = req.files.map((file) => ({
    filename: file.filename,
    url: `${process.env.BASE_URL}src/assets/images-` + file.filename,
  }));

  const data = await Product.findByIdAndUpdate(
    _id,
    {
      product_name,
      product_desc,
      product_stock,
      product_price,
      product_discount,
      category_name,
      product_images,
    },
    { new: true }
  );
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
    } else if (!product_images) {
      return res
        .status(200)
        .json({ status: 400, message: "Product Images are required" });
    } else if (!data) {
      return res.status(200).json({ status: 400, message: "No data found" });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "Data updated", data });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error", error });
  }
});
