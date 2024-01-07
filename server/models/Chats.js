import mongoose from "mongoose";
const ChatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chat", ChatSchema);

export default Chats;
