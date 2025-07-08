const user_authentication = (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(200).json({
        success: false,
        message: "user authentication failed",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user authenticated",
    });
  } catch (e) {
    return res.status(500).json({
      success: true,
      message: e.message,
    });
  }
};

export default user_authentication;
