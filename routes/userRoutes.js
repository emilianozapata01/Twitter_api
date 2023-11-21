const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

// router.get("/", userController.index);
// router.get("/crear", userController.create);
// router.get("/:id", userController.show);
router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
router.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.update,
);
// router.delete("/:id", userController.destroy);

module.exports = router;
