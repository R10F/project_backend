const Toko = require("../models/toko.model");
const Produk = require("../models/produk.model");
const sample = require("../models/data.sample");

exports.getProduk = (req, res) => {
  try {
    Toko.find()
      .populate("produk")
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduk = (req, res) => {
  async (req, res) => {
    try {
      await Produk.deleteMany({ _id: { $in: req.body.idsProduk } });
      await Toko.deleteMany({ _id: { $in: req.body.idsToko } });

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

exports.generateProduk = async (req, res) => {
  const produkPerToko = 2;

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
};
