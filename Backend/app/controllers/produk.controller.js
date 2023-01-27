const db = require("../models");
const Toko = db.toko;
const Produk = db.produk;


exports.getAllProduk = (req, res) => {
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

exports.deleteProduk = async (req, res) => {
  try {
    await Toko.deleteMany({ _id: { $in: req.body.idsToko || [] } });
    await Produk.deleteMany({ _id: { $in: req.body.idsProduk } });

    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkToko = async (req) => {
  const id = req.params.id;
  const update = req.body.check;
  const updatedToko = await Toko.findByIdAndUpdate(
    id,
    { check: update },
    { new: true }
  ).populate("produk");

  if (req.body.toggleAll === true) {
    const flag = req.body.check ? 1 : -1;
    let qty = 0;
    let harga = 0;
    let diskon = 0;

    const checkedProduk = updatedToko.produk;
    checkedProduk.forEach((item) => {
      if (item.check != req.body.check) {
        qty += item.qty * flag;
        harga += item.harga * item.qty * flag;
        diskon += ((item.harga * item.qty * item.diskon) / 100) * flag;
      }
    });
    const updatedProduk = await Produk.updateMany(
      { _id: { $in: checkedProduk }, check: !req.body.check },
      { check: update }
    );
    const ret = { harga: harga, diskon: diskon, increment: qty };
    return ret;
  } else {
    return updatedToko;
  }
};

const editProduk = async (req) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedProduk = await Produk.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  const ret = { harga: updatedProduk.harga, diskon: updatedProduk.diskon || 0 };
  return ret;
};

exports.checkProduk = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updatedProduk = await Produk.findByIdAndUpdate(id, update, {
      new: true,
    });

    const flag = req.body.check ? 1 : -1;

    const qty = updatedProduk.qty * flag;
    const harga = updatedProduk.harga * qty;
    const diskon = (updatedProduk.diskon / 100) * harga;
    const ret = { harga: harga, diskon: diskon || 0, increment: qty };
    res.status(200).send(ret);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.checkToko = async (req, res) => {
  try {
    const update = await checkToko(req);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.checkAll = async (req, res) => {
  try {
    const toko = req.body.toko;
    const produk = req.body.produk;
    const update = req.body.check;
    await Toko.updateMany(
      { _id: { $in: toko }, check: !update },
      { check: update }
    );
    await Produk.updateMany(
      { _id: { $in: produk }, check: !update },
      { check: update }
    );
    res.status(200).send();
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};

exports.editProduk = async (req, res) => {
  try {
    const update = await editProduk(req);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
