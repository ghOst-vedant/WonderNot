import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getDataUri } from "../middleware/dataUri.js";
import cloudinary from "cloudinary";
/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, friends, skills, location } =
      req.body;
    if (password.length < 8) {
      return res.json({
        error: "Password must be atleast 8 character in length.",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already exists.",
      });
    }
    let picPath =
      "https://res.cloudinary.com/dzkugyv7g/image/upload/v1707825882/UserImages/kp7mnjp5wkajarapjnr6.png";
    if (req.file) {
      const picture = req.file;
      const fileUri = getDataUri(picture);

      const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        folder: "UserImages",
      });
      picPath = myCloud.secure_url;
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(String(password), salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: picPath,
      friends,
      location,
      skills,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    // res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.json({
        error: "No such User.",
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({
        error: "Incorrect Password.",
      });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
