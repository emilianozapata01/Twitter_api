const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get(
  "/:username",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  pagesController.showUser,
);

module.exports = router;
