import express from "express";
import cors from "cors";
const router = express.Router();
import { loginUser, registerUser } from "../controllers/authController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/register", registerUser);
router.post("/login", loginUser);
export { router as authRoute };
