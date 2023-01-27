const express = require('express');
const router = express.Router();
const controller = require("../controllers/sample.controller");


router.get("/generate-sample-produk", controller.generateSampleProduk);


module.exports = router;
