import { Router } from "express";
import multer from "multer";
import moment from "moment";
import { extname, resolve } from "path";
import {
  addProduct,
  deleteProduct,
  getAddProduct,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve("./src/assets/images/"));
  },
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const timestamp = moment().format("DD_MMM_YY--h-mm");
    const filename = `${timestamp}-${ext}`;
    cb(null, filename);
  },
});
const no_upload = multer().none();
const upload = multer({ storage }).any("product_images");

router.post("/addProduct/:_id", upload, addProduct);
router.get("/getAddProduct", no_upload, getAddProduct);
router.get("/getSingleProduct/:_id", no_upload, getSingleProduct);
router.delete("/deleteProduct/:_id", no_upload, deleteProduct);
router.post("/updateProduct/:_id", upload, updateProduct);

export default router;
