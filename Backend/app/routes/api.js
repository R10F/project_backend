// const express = require('express');
// const router = express.Router();
// const db = require('../models');
const Toko = require('../models/toko.model');
const Produk = require('../models/produk.model');

const checkToko = async (req) => {
    const id = req.params.id;
    const update = req.body.check;
    const updatedToko = await Toko.findByIdAndUpdate(id, {check: update}, {new: true});

    // ada skenario ketika Toko CHECKED. lalu, user uncheck salah satu produk. maka, toko juga di-uncheck, tapi bukan berarti semua item kena uncheck (skenario A//toggleAll = false).
    // satu lagi ketika emg smua checked dan user klik uncheck toko lagi (skenario B // toggleAll = true). 
    // utk skenario B, karena di produk enggak ada ID toko, handle dari frontend dulu baru panggil checkToko?
    console.log(typeof(req.body.toggleAll));
    //pakai package body-parser bisa terima bool lgsg?
    if (req.body.toggleAll == 'true'){
        const checkedProduk = updatedToko.produk;
        const updatedProduk = await Produk.updateMany({_id : {$in: checkedProduk} }, {check: update}, {new: true});
        return [{toko: updatedToko}, {produk: updatedProduk}]
    }
    else{
        return updatedToko
    }
}

module.exports = (router) => {
    router.get('/api', async (req, res) => {
        try{
            const item = await Toko.find();
            res.json({item});
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    })
    router.put('/api/checkProduk/:id', async (req, res) => {
        try{
            const id = req.params.id;
            const update = req.body;
            const updatedProduk = await Produk.findByIdAndUpdate(id, update, {new: true});
            res.status(200).json(updatedProduk);
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    })
    router.put('/api/checkToko/:id', async(req, res) => {
        try{
            const update = await checkToko(req);
            res.status(200).json(update);
        }
        catch(err){
            res.status(500).json({message: err.message})
        }
    })
}