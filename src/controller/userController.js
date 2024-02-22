import User from "../module/authModule.js";
import asyncHandler from "express-async-handler";

export const getAllUser = asyncHandler(async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      status: 200,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "500 internel server error" });
  }
});
