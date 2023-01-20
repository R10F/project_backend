const mongoose = require("mongoose");
const { Schema } = mongoose;

const produkSchema = new Schema({
    'nama': {
        required: true,
        type: String
    },
    'harga': {
        required: true,
        type: Number
    },
    'qty': {
        required: true,
        type: Number
    },
    'diskon': Number,
    'gambar': {
        required: true,
        type: String
    },
    'check': {
        type: Boolean,
        default: false
    }
})

const Produk = mongoose.model('Produk', produkSchema);
module.exports = Produk;