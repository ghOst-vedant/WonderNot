import { UserModel as User } from "../models/users.js";
import dotenv from "dotenv";
dotenv.config();
import { hashPassword, comparePassword } from "../auth/auth.js";
import jwt from "jsonwebtoken";
const test = (req, res) => {
  res.json("Test is Working");
};

// Endpoint For a New User
const registerUser = async (req, res) => {
  try {
    const { name, email, number, password, gender } = req.body;

    // check name and password
    if (!name) {
      return res.json({
        error: "Name is required.",
      });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "Password is required and must be atleas 8 character in length.",
      });
    }
    // check email exist
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already exists.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      number,
      password: hashedPassword,
      gender,
    });
    return res.json({ message: "User Created Succesfully" });
  } catch (error) {
    console.log(error);
  }
};

// EndPoint to Login  User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // exist??
    if (!email) {
      return res.json({
        error: "Enter a email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not found",
      });
    }
    // password check
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "wrong password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      userID: user._id,
      userName: user.name,
      userEmail: user.email,
      userGender: user.gender,
      userContact: user.number,
    });
  } catch (error) {
    console.log(error);
  }
};

export { test, registerUser, loginUser };
