import asyncHandler from "express-async-handler";
import category from "../model/categoryModal.js";
import product from "../model/productModel.js";

export const addCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;
  const haveProduct = await product.findOne({ category_name });
  const haveCategory = await category.findOne({ category_name });

  try {
    if (!category_name) {
      return res
        .status(200)
        .json({ status: 400, message: "Catagory name is required" });
    } else if (haveCategory) {
      return res
        .status(200)
        .json({ status: 400, message: "Category already exists!" });
    } else {
      const formattedData = {
        category_name,
        data: haveProduct,
      };
      const result = await category.create(formattedData);
      return res.status(200).json({
        status: 200,
        message: "category has been created!",
        data: result,
      });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ status: 500, message: "internal server error", error });
  }
});

export const getAllCategory = asyncHandler(async (req, res) => {});

export const getSingleCategory = asyncHandler(async (req, res) => {});

export const editCategory = asyncHandler(async (req, res) => {});

export const deleteCategory = asyncHandler(async (req, res) => {});
