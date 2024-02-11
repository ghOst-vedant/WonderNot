import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
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
      default:
        "https://res.cloudinary.com/dzkugyv7g/image/upload/v1703526486/UserImages/b6gahysyir4yywwjn086.webp",
    },
    friends: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    notification: {
      type: Array,
      default: [],
    },
    seennotification: {
      type: Array,
      default: [],
    },
    isA: {
      type: String,
    },
    mentorSkills: {
      type: Array,
      default: [],
    },
    location: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
