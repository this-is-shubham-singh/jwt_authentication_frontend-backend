import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnection from "./config/Database.js";
import route from "./routes/Routes.js";

const app = express();
dotenv.config();

// db connections 
dbConnection();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());

// mounting routes
app.use("/api/auth", route);

app.listen(port, () => {
  console.log("listening at port" + " " + port);
});
