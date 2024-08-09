// src/routes/wisataRoutes.js
import express from "express";
import {
  getListWisata,
  getWisataByID,
  getImageUtamaWisata,
  getGaleriWisata,
  getAllWisataData,
} from "../controllers/wisataController.js";

import { createWisata } from "../controllers/wisataPost.js";

const router = express.Router();

export default function (db) {
  // Get all summaries
  router.get("/", (req, res) => getListWisata(req, res, db));

  // Get all data
  router.get("/all", (req, res) => getAllWisataData(req, res, db));

  // Create a new wisata
  router.post("/post", (req, res) => createWisata(req, res, db));

  // Get specific wisata details
  router.get("/:id", (req, res) => getWisataByID(req, res, db));

  // Get imageUtama for a specific wisata
  router.get("/imageUtama/:id", (req, res) =>
    getImageUtamaWisata(req, res, db)
  );

  // Get galeri for a specific wisata
  router.get("/galeri/:id", (req, res) => getGaleriWisata(req, res, db));

  return router;
}
