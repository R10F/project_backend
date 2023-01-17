const express = require('express');
const router = express.Router();

const toko = {
  "Sinar Rezeki Store": {
    "nama": "Sinar Rezeki Store",
    "kota": "Tangerang Selatan",
    "logo": ""
  }
};

const data = [
  {
    "nama": "Yupi Strawberry Kiss 120 gr",
    "harga": 8975,
    "qty": 1,
    "gambar": "",
    "toko": toko["Sinar Rezeki Store"]
  }
];

router.get("/load-sample", (req, res) => {
  res.status(200).json(data);
});

module.exports = router;