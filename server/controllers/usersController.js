import { UserModel } from "../models/users.js";

const getAllUsers = async (req, res) => {
  try {
    const response = await UserModel.find({}, "name");
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
export { getAllUsers };
