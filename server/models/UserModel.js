import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // email stays unique
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  resetPasswordOtp: {
    type: String,
    default: "",
  },
  resetPasswordOtpExpiry: {
    type: Number,
    default: 0, // no () after now as it will set default value at schema creation time.
  },
  verifyEmailOtp: {
    type: String,
    default: "",
  },
  verifyEmailOtpExpiry: {
    type: Number,
    default: 0,
  },
  isUserVerified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
