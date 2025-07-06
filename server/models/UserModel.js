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
  },
  resetPasswordOtpExpiry: {
    type: Date,
    default: Date.now, // no () after now as it will set default value at schema creation time.
  },
  verifyEmailOtp: {
    type: String,
  },
  verifyEmailOtpExpiry: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
