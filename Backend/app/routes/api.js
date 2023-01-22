// const express = require('express');
// const router = express.Router();
// const db = require('../models');

const controllersApi = require("../controllers/api");

module.exports = (router) => {
  router.get("/api", controllersApi.tokoApi);
  router.put("/api/checkProduk/:id", controllersApi.checkProduk);
  router.put("/api/checkToko/:id", controllersApi.checkToko);
};
