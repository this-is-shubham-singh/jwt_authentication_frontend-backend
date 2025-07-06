import express from "express";
import {
  create_user,
  login,
  logout,
  password_reset,
  verify_password_reset_otp,
  save_reset_password,
  verify_email,
  verify_email_otp,
} from "../controllers/Authentication.js";

const route = express.Router();

route.post("/create-user", create_user);
route.post("/login", login);
route.post("/logout", logout);
route.post("/password-reset", password_reset); // create an otp and send it to user
route.post("/verify-password-reset-otp", verify_password_reset_otp); // verify the otp send by user
route.post("/save-reset-password", save_reset_password); // save the new password in the db
route.post("/verify-email", verify_email); // create an otp and send it to user
route.post("/verify-email-otp", verify_email_otp); // verify the otp sent by user

export default route;
