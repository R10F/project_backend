const express = require('express');
const router = express.Router();

const db = require('../models');
const Toko = require('../models/toko.model')
const Produk = require('../models/produk.model');

const toko = [
  {
    "nama": "Sinar Rezeki Store",
    "kota": "Tangerang Selatan",
    "logo": "",
    "check": false
  },
  {
    "nama": "Sinar Rezeki Store",
    "kota": "Tangerang Selatan",
    "logo": "",
    "check": false
  }
];

const produk = [
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 0,
    "gambar": "xx",
  },
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 15,
    "gambar": "xx",
  },
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 0,
    "gambar": "xx",
  },
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 15,
    "gambar": "xx",
  }
];


module.exports = (router) => {
  router.get("/produk", (req, res) => {
    try {
      Toko.find()
        .populate("produk")
        .then(result => {
          res.status(200).json(result);
        });
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  });
  router.delete("/hapus-produk", async (req, res) => {
    try {
      await Produk.deleteMany({ _id: { $in: req.body.idsProduk } });
      await Toko.deleteMany({ _id: { $in: req.body.idsToko } });

      res.status(204).send();
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  });
  router.get("/generate-sample-produk", async (req, res) => {
    const produkPerToko = 2;
  
    try {
      await Produk.insertMany(produk).then(async (insertedProduk) => {
        for (let i = 0; i < toko.length; i++) {
          toko[i].produk = [
            insertedProduk[produkPerToko * i],
            insertedProduk[produkPerToko * i + 1]
          ];
        }
        const result = await Toko.insertMany(toko);
        res.status(200).json(result);
      });
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  });
};