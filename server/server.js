import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnection from "./config/Database.js";
const app = express();
dotenv.config();
dbConnection();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log("listening at port" + " " + port);
});
