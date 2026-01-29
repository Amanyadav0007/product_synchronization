import adminModel from "../models/adminModel.js";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { name, brand, price, quantity } = req.body;
    if (!name || !brand || !price || !quantity) {
      return res.json({ success: false, message: "All fields required!" });
    }

    const newProduct = await productModel({
      name,
      brand,
      price,
      quantity,
    });
    await newProduct.save();

    const adminDoc = await adminModel.findById(adminId);
    adminDoc.products.push(newProduct._id);
    await adminDoc.save();

    res.json({ success: true, message: "New product added successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const productList = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await adminModel.findById(adminId).populate("products");
    if (!admin || admin.products.length === 0)
      return res.json({ success: false, message: "Empty Inventory" });
    res.json({ success: true, products: admin.products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price, quantity } = req.body;
    if (!name || !brand || !price || !quantity) {
      return res.json({ success: false, message: "All fields required!" });
    }

    const product = await adminModel.findByIdAndUpdate(
      id,
      { name, brand, price, quantity },
      { new: true },
    );
    res.json({ success: true, message: "Product updated successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, editProduct, productList };
