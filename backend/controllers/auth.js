const User = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const Budget = require("../models/budgetModel.js");

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    "your_secret_key",
    { expiresIn: "1h" } // Ajoutez une expiration pour le token
  );

  const existingBudgets = await Budget.find({ userId: user._id });

  return {
    userId: user._id,
    token,
    hasBudgets: existingBudgets.length > 0,
  };
};

const register = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    "your_secret_key",
    { expiresIn: "1h" } // Ajoutez une expiration pour le token
  );

  return { token };
};

module.exports = {
  login,
  register,
};
