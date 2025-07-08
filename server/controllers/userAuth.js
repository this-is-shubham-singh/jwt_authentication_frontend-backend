import User from "../models/UserModel.js";

const user_authentication = async (req, res) => {
  try {

    // getting id which was set by middleware 
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "user authentication failed",
      });
    }

    const user_data = await User.findById(id);
    if (!user_data) {
      return res.status(400).json({
        success: false,
        message: "user data doesn't exist",
      });
    }

    let data = {
      name: user_data.name,
      email: user_data.email,
      is_user_verified: user_data.isUserVerified,
    };

    return res.status(200).json({
      success: true,
      user_data: data,
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
