import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import mainRoutes from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/error.js";
import db from "./config/connect.js";

dotenv.config();

db();
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", mainRoutes);

app.use("/getimage", express.static("./uploads"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  next();
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
