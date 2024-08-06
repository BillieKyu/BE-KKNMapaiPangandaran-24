// src/index.js
import express from "express";
import { initializeFirebase } from "./services/firebaseService.js";
import wisataRoutes from "./routes/wisataRoutes.js";

async function startServer() {
  try {
    const db = await initializeFirebase();

    const app = express();
    const port = process.env.PORT || 3000;

    // Root route
    app.get("/", (req, res) => {
      res.send("Welcome to the Wisata API. Use /wisata to access the API.");
    });

    // API routes
    app.use("/wisata", wisataRoutes(db));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
