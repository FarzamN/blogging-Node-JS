import { Router } from "express";
import {
  addCategory,
  getAllCategory,
  getSingleCategory,
  editCategory,
  deleteCategory,
} from "../controller/categoryController.js";
import multer from "multer";

const router = Router();
const no_upload = multer().none();

router.post("/addCategory", no_upload, addCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getSingleCategory/:id", getSingleCategory);
router.patch("/editCategory/:id", no_upload, editCategory);
router.delete("/deleteCategory/:id", deleteCategory);

export default router;
