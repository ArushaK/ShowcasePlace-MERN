const express = require("express");
const { check } = require("express-validator");

const UsersController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", UsersController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  UsersController.signup
);

router.post("/login", UsersController.login);

module.exports = router;
