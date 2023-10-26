const { mongoose, Schema } = require("../db");

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  description: String,
  pfp: String,
  tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// Crear esquema y modelo User...
