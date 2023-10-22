import { PostModel } from "../models/post_model.js";

const getAllPost = async (req, res) => {
  try {
    const response = await PostModel.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  try {
    const post = new PostModel(req.body);
    const response = await post.save();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export { createPost, getAllPost };
