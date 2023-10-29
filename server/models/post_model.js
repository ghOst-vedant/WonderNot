import { mongoose, Schema } from "mongoose";
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  imageUrl: {
    type: String,
  },
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const PostModel = mongoose.model("Post", postSchema);

export { PostModel };
