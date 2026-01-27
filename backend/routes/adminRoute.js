import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  adminLogin,
  adminRegister,
  updateProfile,
  removeAdmin,
} from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.patch("/update/:id", authAdmin, updateProfile);
adminRouter.delete("/delete/:id", authAdmin, removeAdmin);

export default adminRouter;
