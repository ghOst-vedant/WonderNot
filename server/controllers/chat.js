import Chats from "../models/Chats.js";

export const createChat = async (req, res) => {
  const newChat = new Chats({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    console.error("Create Chat error:", error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await Chats.find({
      members: { $in: [req.params.userId] },
    }).exec();
    res.status(200).json(chat);
  } catch (error) {
    console.error("User Chats error:", error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await Chats.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    s;
    res.status(200).json(chat);
  } catch (error) {
    console.error("Create Chat error:", error);
  }
};
