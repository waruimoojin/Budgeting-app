const User = require("../models/usersModel.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError =  require("../utils/ApiError")
const httpStatus = require("http-status")
const Budget = require('../models/budgetModel.js');


const login = async ({email, password}) => {

        const user = await User.findOne({ email });
        if (!user) {

          throw new ApiError(httpStatus.BAD_REQUEST, "Invlid email and password")
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Invlid email and password")
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key');

        const existingBudgets = await Budget.find({ userId: user._id });

        if (existingBudgets.length > 0) {
          return { userId: user._id, token, hasBudgets: true };
            } else {
          return { userId: user._id, token, hasBudgets: false };

        }


}

const register = async({email, password}) => {


        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new ApiError(httpStatus.BAD_REQUEST, "User already exists")
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({ email, password: hashedPassword });


        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your_secret_key');


        return {token}

}


module.exports = {
    login,
    register,


}