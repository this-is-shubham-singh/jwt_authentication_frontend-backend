import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_Server,
  port: 587,
  auth: {
    user: process.env.EMAILER,
    pass: process.env.PASSWORD,
  },
});

export default transporter;
