const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/:username", pagesController.showUser);

module.exports = router;
