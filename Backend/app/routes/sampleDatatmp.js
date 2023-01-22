const express = require("express");
const router = express.Router();

const db = require("../models");
const controllersData = require("../controllers/sampleData");

module.exports = (router) => {
  router.get("/produk", controllersData.getProduk);

  router.delete("/hapus-produk", controllersData.deleteProduk);

  router.get("/generate-sample-produk", controllersData.generateProduk);
};
