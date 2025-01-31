const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');
/**
 * Login API
 */
router.post(
  "/login",
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email and password are required");
    }

    const response = await authController.login({ email, password });
    res.status(httpStatus.OK).send(response);
  })
);

/**
 * Register API
 */
router.post(
  "/register",
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email and password are required");
    }

    const response = await authController.register({ email, password });
    res.status(httpStatus.CREATED).send(response);
  })
);

module.exports = router;