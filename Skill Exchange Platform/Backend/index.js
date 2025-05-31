import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequests.js"; 

const app = express();
app.use(express.json());
app.use(cors());




console.log("MONGO_URL:", process.env.MONGO_URL);

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error("❌ MONGO_URL is undefined. Check your .env file.");
  process.exit(1);
}


mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/requests", serviceRequestRoutes); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
