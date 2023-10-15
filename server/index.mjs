import express from "express";
// const dotenv = require("dotenv").config();
import dotenv from "dotenv";
// const cors = require("cors");
import cors from "cors";
// const { mongoose } = require("mongoose");
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { router } from "./routes/authRouters.js";
// db connection
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Not connected", err));
const app = express();
const port = 8000;

// middle
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
