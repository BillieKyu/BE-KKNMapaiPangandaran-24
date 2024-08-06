// src/services/firebaseService.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

export async function initializeFirebase() {
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
    return getFirestore();
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
}
