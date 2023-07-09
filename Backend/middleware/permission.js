import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// only user logged user have access
export const auth = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    console.log(user)
    if (user) {
      //current user
      req.user = user;
      next();
    } else {
      res.status(401);
      throw new Error("aucun utilisateur n'a trouvé !");
    }
  } else {
    res.status(401);
    throw new Error("Non autorisé, le token a échoué");
  }
});

export const user = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role == "User") {
    next();
  } else {
    res.status(401);
    throw new Error("Non autorisé, pas d'utilisateur");
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role == "Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Non autorisé, pas d'administrateur");
  }
});

