const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const catchAsnc = require("../utils/catchAsync");

/**
 * Login API
 */
router.post(
  "/login",
  catchAsnc(async (req, res) => {
    const { body } = req;
    if (!body.email || !body.password)
      return res
        .status(400)
        .send({ message: "email or password are required!" });
    const response = await authController.login(body, res);
    res.status(200).send(response);
  }),
);

/**
 * Register API
 */

router.post(
  "/register",
  catchAsnc(async (req, res) => {
    const { body } = req;

    if (!body.email || !body.password)
      return res
        .status(400)
        .send({ message: "email or password are required!" });
    const response = await authController.register(body);
    res.status(200).send(response);
  }),
);

module.exports = router;
