import { Schema, model } from "mongoose";

const postSchema = new Schema({
  description: {
    required: true,
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = model("Post", postSchema);

export default Post;