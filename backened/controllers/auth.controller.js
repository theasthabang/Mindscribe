import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ name, email });
    }
    else {
      // Patch existing users who were created before credits field existed
      if (user.credits === undefined || user.credits === null) {
        user.credits = 100;
        user.isCreditAvailable = true;
        await user.save();
      }
      }
    let token = await getToken(user._id);
    
    // Keep cookie for local dev
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    // Also return token in body for production
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: `googleSignup Error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "LogOut Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout Error  ${error}` });
  }
  console.log("Cookies:", req.cookies);
};
