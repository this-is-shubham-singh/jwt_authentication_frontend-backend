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
import { auth, auth_reset_token } from "../middleware/middlewares.js";

const route = express.Router();

route.post("/create-user", create_user);
route.post("/login", login);
route.post("/logout", auth, logout);
route.post("/send-verify-otp", auth, send_verify_otp);
route.post("/verify-account", auth, verify_account);
route.post("/send-reset-otp", send_reset_otp);
route.post("/verify-reset-otp", auth_reset_token, verify_reset_otp);
route.post("/save-reset-password", auth_reset_token, save_reset_password);

export default route;
