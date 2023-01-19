const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
    "toko": 0
  },
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 15,
    "gambar": "xx",
    "toko": 0
  }
]

module.exports = (router) => {
  router.get("/load-sample", async (req, res) => {
    try{
      const newToko = await Toko.insertMany(toko);
      let inserted = [];
      newToko.map(t => {
        console.log(t);
        const key = t._id.toString();
        const newIn = {
          'idToko': key,
          'idProduk': []
        }
        inserted[key] = [];
      });
      produk.map(p => {
        p.toko = inserted[p.toko];
        console.log(p.toko);
      })
      const newProduk = await Produk.create(produk);
      // newProduk.map(new)
      res.status(200).json({"message": toko});
    }
    catch (err){
      console.log('err');
      res.status(500).json({"message": err.errors});
    }
  });
};