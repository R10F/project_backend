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
    // "toko": 0
  },
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 15,
    "gambar": "xx",
    // "toko": 0
  },
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 0,
    "gambar": "xx",
    // "toko": 0
  },
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "diskon": 15,
    "gambar": "xx",
    // "toko": 0
  }
];

module.exports = (router) => {
  router.delete("/hapus-produk", async (req, res) => {
    const result = await Produk.deleteMany({})
    res.status(200).json({a:req.body.idsToko, b:req.body.idsProduk})
  })
  router.get("/load-sample", async (req, res) => {
    try{
      const result1 = await Produk.insertMany(produk).then((insertedProduk) => {
        for (let i = 0; i < toko.length; i++) {
          const produkPerToko = 2;
          for (let i = 0; i < toko.length; i++) {
            toko[i].produk = [
              insertedProduk[produkPerToko * i],
              insertedProduk[produkPerToko * i + 1]
            ];
          }
          
          console.log(insertedProduk)
        }
      }).then(async () => {
        const result2 = await Toko.insertMany(toko);

      });
      // console.log(insertedProduk)
      // const insertedToko = await Toko.insertMany(toko);
      
      // .then(() => {
      //   for (let i = 0; i < insertedToko.length; i++) {
        //   }

      // });

      // const result = insertedToko.map((item, i) => {
      //   console.log(item,i)
      //   // for (let i = 0; i < produk.length; i++) {
      //   //   item.produk = [produk[i], produk[i + 1]];
      //   // }
      // });
      // let inserted = [];
      // newToko.map(t => {
      //   console.log(t);
      //   const key = t._id.toString();
      //   const newIn = {
      //     'idToko': key,
      //     'idProduk': []
      //   }
      //   inserted[key] = [];
      // });
      // produk.map(p => {
      //   p.toko = inserted[p.toko];
      //   console.log(p.toko);
      // })
      // const newProduk = await Produk.create(produk);
      // newProduk.map(new)
      res.status(200).json({ toko, result1});
    }
    catch (err){
      console.log(err);
      res.status(500).json({"message": err.errors});
    }
  });
};