import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "user invalid, login!",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "user invalid, login!",
      });
    }

    req.user = decoded;

    // middleware should not return a success response
    // else it will end the request early and logout will never run

    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const auth_reset_token = async (req, res, next) => {
  try {
    // get token from header authorization
    const auth_data = req.get("authorization");
    if (!auth_data || !auth_data.startsWith("Bearer")) {
      return res.status(400).json({
        success: true,
        message: "unauthorized token",
      });
    }

    // extracted token from auth data
    const token = auth_data.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({
        success: true,
        message: "token authorization failed",
      });
    }

    // put payload on request
    req.user = decoded;

    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export { auth, auth_reset_token };
