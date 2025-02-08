import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { config } from "./config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

export default app;
