const mongoose = require("mongoose");
const {Schema} = mongoose;

const tokoSchema = new Schema({
    'nama': {
        required : true,
        type: String
    },
    'kota': {
        required : true,
        type: String
    },
    'logo': {
        type: String
    },
    'check': {
        required : true,
        type: Boolean
    },
    'produk': [{type: Schema.Types.ObjectId, ref: 'Produk'}]
})

const Toko = mongoose.model('Toko', tokoSchema);
module.exports = Toko;