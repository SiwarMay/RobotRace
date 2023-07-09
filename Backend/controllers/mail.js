import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import { resetPasswordMail, sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// @desc    forget password
// @route   POST /api/auth/forgetpassword
// @access  Public
export const forgetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const subject = "Reset Password";
    const text = `Thank you for registering with us. Please click on the link below to reset your password. Note: This link will expire in 1 hour.\n\n${process.env.CLIENT_URL}/reset-password/${token}`;

    await resetPasswordMail(email, subject, text, token);

    return res
      .status(200)
      .json({ message: `Password reset email sent to ${email}` });
  } catch (error) {
    next(error);
  }
});

export const sendVerifyEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }
    const token = generateToken(user._id);

    const subject = "Vérifier l'e-mail de Test";
    const text =
      "Merci de vous être inscrit chez nous. Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse e-mail. Remarque : Ce lien expirera dans 24 heures";

    sendMail(email, subject, text, token);

    res.status(201).json({
      message:
        "vous avez été enregistré, veuillez confirmer votre vérification par e-mail",
    });
  } catch (error) {
    next(error);
  }
});

// @desc    reset password
// @route   PUT /api/auth/resetpassword
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      return res
        .status(400)
        .json({ message: "Password and token are required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
});
