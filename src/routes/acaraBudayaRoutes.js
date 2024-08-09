// src/routes/acaraBudayaRoutes.js
import express from "express";
import {
  getAllAcaraBudayaData,
  getListAcaraBudaya,
  getAcaraBudayaByID,
} from "../controllers/acaraBudayaController.js";
import { createAcaraBudaya } from "../controllers/acaraBudayaPost.js";

const router = express.Router();

export default function (db) {
  // Get all summaries
  router.get("/", (req, res) => getListAcaraBudaya(req, res, db));

  // Get all data
  router.get("/all", (req, res) => getAllAcaraBudayaData(req, res, db));

  // Create a new acara & budaya
  router.post("/post", (req, res) => createAcaraBudaya(req, res, db));

  // Get specific acara & budaya details
  router.get("/:id", (req, res) => getAcaraBudayaByID(req, res, db));

  // Get galeri for a specific acara & budaya
  //   router.get("/:id/galeri", (req, res) => getGaleriAcaraBudaya(req, res, db));

  return router;
}
