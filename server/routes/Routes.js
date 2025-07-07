import express from "express";
import {
  create_user,
  login,
  logout,
  send_reset_otp,
  verify_reset_otp,
  save_reset_password,
  send_verify_otp,
  verify_account,
} from "../controllers/Authentication.js";
import auth from "../middleware/middlewares.js";

const route = express.Router();

route.post("/create-user", create_user);
route.post("/login", login);
route.post("/logout", auth, logout);
route.post("/send-reset-otp", send_reset_otp); // create an otp and send it to user
route.post("/verify-reset-otp", verify_reset_otp); // verify the otp send by user
route.post("/save-reset-password", save_reset_password); // save the new password in the db
route.post("/send-verify-otp", auth, send_verify_otp); // create an otp and send it to user
route.post("/verify-account", auth, verify_account); // verify the otp sent by user

export default route;
