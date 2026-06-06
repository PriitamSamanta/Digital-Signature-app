import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import documentRoutes from "./routes/documentRoutes";
import signatureRoutes from "./routes/signatureRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/signatures", signatureRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Digital Signature API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});