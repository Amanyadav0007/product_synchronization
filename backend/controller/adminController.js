import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getProfile = async (req, res) => {
  try {
    res.json({ success: true, profile: req.admin });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

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

const updateBankDetails = async (req, res) => {
  try {
    const { bank, branch, account, ifsc } = req.body;
    const id = req.admin.id;
    const bankDetails = await adminModel.findByIdAndUpdate(
      id,
      { bank, branch, account, ifsc },
      { new: true },
    );
    res.json({ success: true, message: "Bank Details Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateBusinessDetails = async (req, res) => {
  try {
    const id = req.admin.id;
    const { name, address, city, state, pin, phone, gst, pan, msme } = req.body;
    const businessDetails = await adminModel.findByIdAndUpdate(
      id,
      { business: name, address, city, state, pin, phone, gst, pan, msme },
      { new: true },
    );
    res.json({ success: true, message: "Business Details Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateTnc = async (req, res) => {
  try {
    const id = req.admin.id;
    const { tnc } = req.body;
    const cleanedTnc = await adminModel.findByIdAndUpdate(
      id,
      { tnc },
      { new: true },
    );
    res.json({ success: true, message: "Terms & Conditions Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  getProfile,
  adminRegister,
  adminLogin,
  updateBankDetails,
  updateBusinessDetails,
  updateTnc,
};
