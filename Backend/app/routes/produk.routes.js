const express = require('express');
const router = express.Router();
const controller = require("../controllers/produk.controller");


router.get("/produk", controller.getAllProduk);
router.delete("/hapus-produk", controller.deleteProduk);
router.put("/checkProduk/:id", controller.checkProduk);
router.put("/checkToko/:id", controller.checkToko);
router.put("/editProduk/:id", controller.editProduk);
router.put("/checkAll", controller.checkAll);


module.exports = router;
