// const express = require('express');
// const router = express.Router();
// const db = require('../models');
const Toko = require('../models/toko.model');

module.exports = (router) => {
    router.get('/api', async (req, res) => {
        try{
            const item = await Toko.find();
            res.json({item});
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })
}