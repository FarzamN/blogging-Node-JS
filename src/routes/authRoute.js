import express from "express";
import multer from "multer";
import { resolve, extname } from "path";

import {
  login,
  register,
  checkEmailnPhone,
  checktoForgetPassword,
  changePassword,
  editProfile,
} from "../controller/authController.js";
import moment from "moment";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve("./src/assets/images/"));
  },
  filename: (req, file, cb) => {
    let { fullName } = req.body;
    fullName = fullName.replace(/\s+/g, "");
    const ext = extname(file.originalname);
    const timestamp = moment().format("DD_MMM_YY--h-mm");
    const filename = `${timestamp}-${fullName}${ext}`;
    cb(null, filename);
  },
});

const no_upload = multer().none();
const upload_single = multer({ storage }).single("profile_image");

router.post("/login", no_upload, login);
router.post("/register", upload_single, register);
router.post("/checkEmailnPhone", no_upload, checkEmailnPhone);
router.post("/checktoForgetPassword", no_upload, checktoForgetPassword);
router.post("/changePassword/:_id", no_upload, changePassword);
router.post("/editProfile/:_id", upload_single, editProfile);

export default router;
