import express from "express";
import multer from "multer";

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
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, moment().format("DD_MMM_YY--h-mm") + "-" + file.originalname);
  },
});

const upload = multer();
const upload2 = multer({ storage });

router.post("/login", upload.none(), login);
router.post("/register", upload2.single("profile_image"), register);
router.post("/checkEmailnPhone", upload.none(), checkEmailnPhone);
router.post("/checktoForgetPassword", upload.none(), checktoForgetPassword);
router.post("/changePassword/:_id", upload.none(), changePassword);
router.post("/editProfile/:_id", upload.none(), editProfile);

export default router;
