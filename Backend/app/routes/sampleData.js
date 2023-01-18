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
    "nama": "Gelap Rezeki Store",
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
  // {
  //   "nama": "Taro 120 gr",
  //   "harga": 8975,
  //   "qty": 1,
  //   "diskon": 0,
  //   "gambar": "xx",
  //   "toko": 1
  // },
  // {
  //   "nama": "Taro 120 gr",
  //   "harga": 8975,
  //   "qty": 1,
  //   "diskon": 15,
  //   "gambar": "xx",
  //   "toko": 1
  // }
]

module.exports = (router) => {
  router.get("/load-sample", async (req, res) => {
    for (let idx = 0; idx < toko.length; idx++) {
      const t = toko[idx];
      let newToko = new Toko({
        nama: t.nama,
        kota: t.kota,
        logo: t.logo,
        check: t.check
      });
      newToko.save((err) => {
        if (err){
          res.status(500).send({"message": err.errors});
          return;
        }
        produk.map(async (p) => {
          if (p.toko == idx){
            console.log(p.nama);
            const newProduk = new Produk({
              nama: p.nama,
              harga: p.harga,
              qty: p.qty,
              diskon: p.diskon,
              gambar: p.gambar,
              toko: newToko._id
            });
            newProduk.save(async (err) => {
              if (err) {res.status(500).send({'message': err.errors}); return;}
              newToko.produk.push(newProduk._id);
              const newTokoDoc = await newToko.save();
            });
          }
        })
      })
    };
    try{
      const item = await Toko.find();
      res.json({item});
    }
    catch(err){
      res.status(500).json({'message': err.message})
    }
  });
};