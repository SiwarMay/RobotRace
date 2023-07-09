import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import bcrypt from 'bcrypt';
const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();

    let fl = date + "." + file.mimetype.split("/")[1];

    redirect(null, fl);

    let filename = fl;
  },
});
const upload = multer({ storage: mystorage });
// @desc    login user account
// @route   post /api/users/login
// @access  public
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user.isActive) {
    res.status(401);
    throw new Error("you account is not active");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone:user.phone,
      email: user.email,
      image: user.image,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// @desc    login user account
// @route   post /api/users/register
// @access  public
export const userRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName,phone, email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("Adresse e-Mail déjà utilisée!");
  }

  const newUser = await User.create({ firstName, lastName,phone, email, password });

  if (newUser) {
    const token = generateToken(newUser._id);

    const subject = "Vérifier l'e-mail de Test";
    const text =
      "Merci de vous être inscrit chez nous. Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse e-mail. Remarque : Ce lien expirera dans 24 heures";

    sendMail(email, subject, text, token);

    res.status(201).json({
      message:
        "vous avez été enregistré, veuillez confirmer votre vérification par e-mail",
    });
  } else {
    res.status(404);
    throw new Error("Quelque chose c'est mal passé. Merci d'essayer plus tard");
  }
});


// @desc    verify new user email
// @route   POST /api/auth/verify/:id
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.params.id;
  if (!token) {
    res.status(401);
    throw new Error("no token");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    res.status(401);
    throw new Error("no token");
  }
  const user = await User.findById(decoded.id);
  console.log(decoded);

  if (!user) {
    res.status(401);
    throw new Error("user not found!");
  }

  user.isActive = true;
  const activeUser = await user.save();
  res.status(200).json({
    _id: activeUser._id,
    firstName: activeUser.firstName,
    lastName: activeUser.lastName,
    phone:activeUser.phone,
    email: activeUser.email,
    role: activeUser.role,
    image: activeUser.image,
    token: generateToken(activeUser._id),
  });
});


export const editProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone:req.body.phone,
        email: req.body.email,
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Vérifier que les deux nouveaux mots de passe correspondent
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    // Vérifier que le nouveau mot de passe n'est pas le même que l'ancien mot de passe
    if (newPassword === oldPassword) {
      return res.status(400).json({ message: "New password cannot be the same as old password" });
    }

    // Vérifier si l'ancien mot de passe est correct
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe de l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { password: hashedPassword },
      { new: true }
    );

    // Générer un nouveau token pour l'utilisateur mis à jour
    const token = generateToken(updatedUser._id);

    return res.status(200).json({ user: updatedUser, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    // Vérifier si un fichier d'image est présent dans la requête
    if (!req.file) {
      return res.status(400).send({ message: 'Veuillez sélectionner une image.' });
    }

    // Enregistrer le fichier dans le répertoire des téléchargements
    const path = req.file.path;
    // Récupérer l'utilisateur connecté
    const userId = req.user._id;
    const user = await User.findById(userId);

    // Mettre à jour le champ image de l'utilisateur
    user.image = req.file.filename, // utilisez le nom du fichier généré par multer
    await user.save();

    // Générer un nouveau token pour l'utilisateur mis à jour
    const token = generateToken(user._id);

    res.status(200).send({ message: 'Image de profil mise à jour avec succès.', token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Une erreur s\'est produite lors de la mise à jour de l\'image de profil.' });
  }
}

// @desc    Add a new property owner
// @route   POST /api/owners
// @access  Private/Manager or Admin only

