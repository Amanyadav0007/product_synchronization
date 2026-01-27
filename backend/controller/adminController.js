import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import productModel from "../models/productModel.js";

const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Details missing" });
    }
    const admin = await adminModel.findOne({ email });
    if (admin)
      return res.json({ success: false, message: "admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({ name, email, password: hashedPassword });
    await newAdmin.save();

    const token = jwt.sign(
      { id: newAdmin._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Details missing" });
    }
    const admin = await adminModel.findOne({ email });
    if (!admin)
      return res.json({ success: false, message: "admin does not exists" });

    const token = jwt.sign({ id: admin._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      phone,
      business_name,
      gst,
      pan,
      msme,
      address,
      tnc,
      bank_name,
      branch_address,
      accountNo,
      ifscCode,
    } = req.body;
    if (
      !phone ||
      !business_name ||
      !gst ||
      !pan ||
      !msme ||
      !address ||
      !tnc ||
      !bank_name ||
      !branch_address ||
      !accountNo ||
      !ifscCode
    ) {
      return res.json({ success: false, message: "Details missing" });
    }
    const { id } = req.params;
    const admin = await adminModel.findByIdAndUpdate(
      id,
      {
        phone,
        business_name,
        gst,
        pan,
        msme,
        address,
        tnc,
        bank_name,
        branch_address,
        accountNo,
        ifscCode,
      },
      { new: true },
    );
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    if (!deletedAdmin)
      return res.json({ success: false, message: "Admin not found" });
    res.json({ success: true, message: "Admin removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export {
  adminRegister,
  adminLogin,
  updateProfile,
  removeAdmin,
};
