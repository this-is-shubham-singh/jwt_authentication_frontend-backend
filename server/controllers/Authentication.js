const create_user = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const login = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const logout = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const password_reset = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const verify_password_reset_otp = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const save_reset_password = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const verify_email = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const verify_email_otp = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export {
  create_user,
  login,
  logout,
  password_reset,
  verify_password_reset_otp,
  save_reset_password,
  verify_email,
  verify_email_otp,
};
