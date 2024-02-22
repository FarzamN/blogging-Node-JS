import { Router } from "express";
import { getAllUser } from "../controller/userController.js";
import multer from "multer";

const router = Router();

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

router.get("/allUser", upload.none(), getAllUser);

export default router;
