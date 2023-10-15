const express = require("express");
const cors = require("cors");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
// router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
