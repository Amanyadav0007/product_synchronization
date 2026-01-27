import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import adminRouter from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";

const port = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/product", productRouter);


app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
