import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnection from "./config/Database.js";
import route from "./routes/Routes.js";
import cors from "cors";

const app = express();
dotenv.config();

// db connections
dbConnection();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// mounting routes
app.use("/api/auth", route);

app.listen(port, () => {
  console.log("listening at port" + " " + port);
});

app.get("/", (req, res) => {
  res.send("<h2>server is running</h2>");
});
