import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if the connection is not successful
  }

  // mongoose
  //   .connect(process.env.MONGO)
  //   .then(() => console.log("Successfully connected to MongoDB."))
  //   .catch((err) => {
  //     console.error("Failed to connect to MongoDB:", err);
  //     process.exit(1); // Optionally exit if unable to connect
  //   });

  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1); // Exit the process with an error code
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.listen(8000, () => {
  connect();
  console.log("Listening to port 8000");
});
