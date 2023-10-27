const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

router.get("/", tweetController.index);
// router.get("/crear", tweetController.create);
// router.get("/:id", tweetController.show);
router.post("/", tweetController.store);
// router.get("/editar/:id", tweetController.edit);
router.patch("/:id", tweetController.update);
router.delete("/:id", tweetController.destroy);

module.exports = router;
