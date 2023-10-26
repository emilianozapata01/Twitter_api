const { mongoose, Schema } = require("../db");

const tweetSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
