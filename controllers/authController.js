const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getToken(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ msg: "Wrong credentials..." });

  const verifyPassword = await bcrypt.compare(req.body.password, user.password);
  if (!verifyPassword) return res.json({ msg: "Wrong credentials..." });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);

  res.json({ token });
}

module.exports = {
  getToken,
};
