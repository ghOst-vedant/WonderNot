import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    picturePath: {
      type: String,
      default: "",
      min: 2,
      max: 50,
    },
    friends: {
      type: Array,
      default: [],
    },
    ocupation: {
      type: Array,
      default: [],
    },
    location: String,
    viewedProfile: Number,
    impression: Number,
  },
  { timestamps: true }
);

const User = mongoose.model;
