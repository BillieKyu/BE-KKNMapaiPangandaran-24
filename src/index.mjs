import express from "express";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

// Load environment variables from .env file
dotenv.config();

// Function to read the service account key JSON file and initialize Firebase Admin SDK
async function initializeFirebase() {
  try {
    const serviceAccount = JSON.parse(
      await readFile(
        new URL(process.env.GOOGLE_APPLICATION_CREDENTIALS, import.meta.url)
      )
    );

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
}

async function startServer() {
  try {
    await initializeFirebase();

    const db = getFirestore();

    const app = express();
    const port = process.env.PORT || 3000;

    app.get("/", async (req, res) => {
      try {
        const snapshot = await db.collection("wisata").get();
        const data = snapshot.docs.map((doc) => doc.data());
        res.send(data);
      } catch (error) {
        console.error("Error connecting to Firestore:", error);
        res.status(500).send("Error connecting to Firestore");
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
