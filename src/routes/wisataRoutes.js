// src/routes/wisataRoutes.js
import express from "express";
import {
  getListWisata,
  getWisataByID,
  getImageUtamaWisata,
  getGaleriWisata,
} from "../controllers/wisataController.js";

const router = express.Router();

export default function (db) {
  router.get("/", (req, res) => getListWisata(req, res, db));
  router.get("/:id", (req, res) => getWisataByID(req, res, db));
  router.get("/Imageutama/:id", (req, res) =>
    getImageUtamaWisata(req, res, db)
  );
  router.get("/galeri/:id", (req, res) => getGaleriWisata(req, res, db));
  return router;
}
