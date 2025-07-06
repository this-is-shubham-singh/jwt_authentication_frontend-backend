import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    console.log(process.env.DATABASE_URI)
    await mongoose.connect(`${process.env.DATABASE_URI}/mern_complete_authentication`);
    console.log("db connection successfull");
  } catch (e) {
    console.log(e.message);
  }
};

export default dbConnection;
