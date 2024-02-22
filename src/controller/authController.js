import User from "../module/authModule.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(200).json({
        status: 400,
        message: `${!email ? "email" : "password"} is required`,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ status: 400, message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    user.password = password;
    if (!isPasswordValid) {
      return res.status(200).json({ status: 400, message: "Invalid Password" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Login successful", data: user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

export const checkEmailnPhone = asyncHandler(async (req, res) => {
  const { email, phone } = req.body;
  const checkEmail = await User.findOne({ email });
  const checkPhone = await User.findOne({ phone });
  try {
    if (!email || !phone) {
      return res.status(400).json({
        status: 400,
        message: `${!email ? "email" : "phone"} is required`,
      });
    } else if (checkEmail || checkPhone) {
      return res.status(400).json({
        status: 400,
        message: `${checkEmail ? "email" : "phone"} already exists`,
      });
    } else {
      const otp = Math.floor(1000 + Math.random() * 9999);
      return res
        .status(200)
        .json({ status: 200, message: "Email and phone are available", otp });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

// export const register = asyncHandler(async (req, res) => {
//   const { fullName, email, password, phone, profile_image, role } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     const phoneExist = await User.findOne({ phone });
//     const avatar = req.file ? req.file.filename : null;

//     if (!fullName || !email || !password || !phone || !profile_image || !role) {

//     } else if (existingUser) {
//       return res
//         .status(200)
//         .json({ status: 400, message: "Email already exists" });
//     } else if (phoneExist) {
//       return res
//         .status(200)
//         .json({ status: 400, message: "Phone already exists" });
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const result = await User.create({
//         fullName,
//         email,
//         password: hashedPassword,
//         phone,
//         profile_image: avatar,
//         role,
//       });
//       return res.status(200).json({
//         status: 200,
//         message: "User registered successfully",
//         data: result,
//       });
//     }
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return res
//       .status(500)
//       .json({ status: 500, message: "Internal server error" });
//   }
// });

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone, role } = req.body;
  try {
    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });
    const avatar = req.file ? req.file.filename : null;

    if (!fullName || !email || !password || !phone || !role) {
      return res.status(200).json({
        status: 400,
        message: `${
          !fullName
            ? "fullName"
            : !email
            ? "email"
            : !password
            ? "password"
            : !phone
            ? "phone"
            : !role
            ? "role"
            : ""
        } is required`,
      });
    } else if (emailExist || phoneExist) {
      return res.status(200).json({
        status: 400,
        message: `${emailExist ? "Email" : "Phone"} already exists`,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await User.create({
        fullName,
        email,
        password: hashedPassword,
        phone,
        profile_image: avatar,
        role,
      });
      return res.status(200).json({
        status: 200,
        message: "User registered successfully",
        data,
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

export const checktoForgetPassword = asyncHandler(async (req, res) => {
  const { email, phone } = req.body;
  const checkEmail = await User.findOne({ email });
  const checkPhone = await User.findOne({ phone });
  const otp = Math.floor(1000 + Math.random() * 9999);
  try {
    if (!checkEmail || !checkPhone) {
      return res.status(200).json({
        status: 400,
        message: `${!checkEmail ? "email" : "Phone Number"} not found`,
      });
    } else if (checkEmail || checkPhone) {
      return res.status(200).json({
        status: 200,
        message: `${checkEmail ? "Email" : "Phone Number"} found Successfully`,
        otp,
        data: checkEmail || checkPhone,
      });
    } else {
      return res
        .status(200)
        .json({ status: 400, message: "Email or Phone not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
    const { _id } = req.params;

    if (!password) {
      return res
        .status(400)
        .json({ status: 400, message: "Password is required!" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(200).json({ status: 404, message: "User not found" });
    } else {
      user.password = password;
      const data = await user.save();
      return res.status(200).json({
        status: 200,
        message: "Password has been updated!",
        data,
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

export const editProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phone } = req.body;
  const profile_image = req.file ? req.file.filename : null;
  const { id } = req.params;
  try {
    if (!fullName || !email || !phone) {
      return res.status(200).json({
        status: 400,
        message: `${
          !fullName ? "fullName" : !email ? "email" : "phone"
        } is required`,
      });
    }

    const existingEmailUser = await User.findOne({ email });
    const existingPhoneUser = await User.findOne({ phone });

    const isEmailTaken = existingEmailUser && existingEmailUser._id != id;
    const isPhoneTaken = existingPhoneUser && existingPhoneUser._id != id;
    if (isEmailTaken || isPhoneTaken) {
      return res.status(400).json({
        status: 400,
        message: `${isEmailTaken ? "Email" : "Phone number"} already exists`,
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(200).json({ status: 400, message: "User not found" });
    }

    user.fullName = fullName;
    user.email = email;
    user.phone = phone;
    if (profile_image) {
      user.profile_image = profile_image;
    }

    await user.save();

    return res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "500 internel server error" });
  }
});
