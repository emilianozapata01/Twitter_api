const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

router.get("/", tweetController.index);
// router.get("/crear", tweetController.create);
// router.get("/:id", tweetController.show);
router.post("/", tweetController.store);
// router.get("/editar/:id", tweetController.edit);
router.patch("/:id/likes", tweetController.update);
router.delete("/:id", tweetController.destroy);

module.exports = router;
