const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokoSchema = new Schema({
    'nama': {
        required: true,
        type: String
    },
    'kota': {
        required: true,
        type: String
    },
    'check': {
        type: Boolean,
        default: false
    },
    'produk': [
        { type: Schema.Types.ObjectId, ref: 'Produk' }
    ]
})

const Toko = mongoose.model('Toko', tokoSchema);
module.exports = Toko;