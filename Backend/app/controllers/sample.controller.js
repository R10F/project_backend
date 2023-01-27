const db = require("../models");
const Toko = db.toko;
const Produk = db.produk;
const sample = require("../models/data.sample");


exports.generateSampleProduk = async (req, res) => {
  Toko.estimatedDocumentCount(async (err, count) => {
    const produkPerToko = 2;

    if (!err && count === 0) {
      try {
        await Produk.insertMany(sample.produk).then(async (insertedProduk) => {
          for (let i = 0; i < sample.toko.length; i++) {
            sample.toko[i].produk = [
              insertedProduk[produkPerToko * i],
              insertedProduk[produkPerToko * i + 1],
            ];
          }
          const result = await Toko.insertMany(sample.toko);
          res.status(200).json(result);
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(200).json({ message: "Data Tidak Kosong" });
    }
  });
};
