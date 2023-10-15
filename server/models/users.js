const { mongoose } = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  email: {
    unique: true,
    type: String,
  },
  number: Number,
  password: String,
  gender: String,
  agreed: Boolean,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
