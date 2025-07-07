import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import transporter from "../config/mailTransporter.js";
dotenv.config();

const create_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "enter all data",
      });
    }

    // check if user already registered
    const existing_user = await User.findOne({ email });
    if (existing_user) {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }

    // hash password and store in db
    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = await User.create({
      name,
      email,
      password: hashed_password,
    });

    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "enter all data",
      });
    }

    // check if user exist or not
    const existing_user = await User.findOne({ email });
    if (!existing_user) {
      return res.status(400).json({
        success: false,
        message: "user doesn't exist",
      });
    }

    // verify password
    const is_match = await bcrypt.compare(password, existing_user.password);
    if (!is_match) {
      return res.status(400).json({
        success: false,
        message: "wrong password",
      });
    }

    // create jwt token
    const payload = {
      id: existing_user._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // put the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "local" ? false : true,
      sameSite: process.env.ENVIRONMENT === "local" ? "lax" : "strict",
      maxAge: 24 * 7 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "logged in",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "logged out",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const send_reset_otp = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const verify_reset_otp = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const save_reset_password = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const send_verify_otp = async (req, res) => {
  try {
    // getting id which was set by middleware authentication
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "login first",
      });
    }

    // getting user data from the id
    const user_data = await User.findById(id);
    if (!user_data) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }

    // check if user is already verified
    if (user_data.isUserVerified === true) {
      return res.status(200).json({
        success: true,
        message: "user already verified",
      });
    }

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    // set otp value on db and also put timer on db
    user_data.verifyEmailOtp = otp;
    user_data.verifyEmailOtpExpiry = Date.now() + 2 * 60 * 1000;
    await user_data.save();

    // send mail to verify
    const mail_sent = await transporter.sendMail({
      from: process.env.EMAILER,
      to: user_data.email,
      subject: "verify your email",
      html: `<p>this is your otp for email verification <b>${otp}</b></p>`,
    });

    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const verify_account = async (req, res) => {
  try {
    // getting otp from user
    const { otp } = req.body;

    // getting id which was set by middleware authentication
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "login first",
      });
    }

    // getting user data using id from db
    const user_data = await User.findById(id);
    if (!user_data) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }

    // check if otp is correct and is entered in time limit
    if (user_data.verifyEmailOtp != otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    } else if (Date.now() > user_data.verifyEmailOtpExpiry) {
      return res.status(400).json({
        success: false,
        message: "otp expired",
      });
    }

    // setting the isUserVerified to true
    user_data.isUserVerified = true;
    user_data.save();

    return res.status(200).json({
      success: true,
      message: "otp verification successfull",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export {
  create_user,
  login,
  logout,
  send_reset_otp,
  verify_reset_otp,
  save_reset_password,
  send_verify_otp,
  verify_account,
};
