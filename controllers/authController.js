const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getToken(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ msg: "Wrong credentials..." });

  const verifyPassword = await bcrypt.compare(req.body.password, user.password);
  if (!verifyPassword) return res.json({ msg: "Wrong credentials..." });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
  const { firstname, lastname, email, pfp, username, _id } = user;
  return res.json({ token, firstname, lastname, email, pfp, username, id: _id });
}

module.exports = {
  getToken,
};
