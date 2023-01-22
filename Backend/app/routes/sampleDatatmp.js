const express = require("express");
const router = express.Router();

const db = require("../models");
const controllersSample = require("../controllers/sampleData");
module.exports = (router) => {
  router.get("/produk", controllersSample.getProduk);

  router.delete("/hapus-produk", controllersSample.deleteProduk);

  router.get("/generate-sample-produk", controllersSample.generateProduk);
};
