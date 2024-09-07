import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routerHTML from "./routes/quizHTMLRoutes.js"; // Pastikan ekstensi .js
import routerCSS from "./routes/quizCSSRoutes.js"; // Pastikan ekstensi .js

// Load environment variables from .env file
dotenv.config();

const app = express();

// Set up CORS to allow requests from frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Port frontend
  })
);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB using environment variables or fallback to localhost
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ExamQuestion")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Use the quiz routes
app.use("/questions/html", routerHTML); // Rute untuk QuizHTML
app.use("/questions/css", routerCSS); // Rute untuk QuizCSS

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const port = process.env.PORT || 3001; // Port backend
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
