const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.toko = require("./toko.model");
db.produk = require("./produk.model");

module.exports = db;