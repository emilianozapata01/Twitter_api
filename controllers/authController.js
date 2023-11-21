const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getToken(req, res) {
  let user;

  if (req.body.usernameOrEmail.includes("@")) {
    user = await User.findOne({ email: req.body.usernameOrEmail });
  } else {
    user = await User.findOne({ username: req.body.usernameOrEmail });
  }

  if (!user) return res.json({ msg: "Wrong credentials..." });

  const verifyPassword = await bcrypt.compare(req.body.password, user.password);
  if (!verifyPassword) return res.json({ msg: "Wrong credentials..." });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
  const { firstname, lastname, email, pfp, username, _id, followers, following } = user;
  return res.json({
    token,
    firstname,
    lastname,
    email,
    pfp,
    username,
    id: _id,
    followers,
    following,
  });
}

module.exports = {
  getToken,
};
