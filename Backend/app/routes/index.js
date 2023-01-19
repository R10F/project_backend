const express = require('express');
const router = express.Router();

const loadSample = require('./sampleDatatmp');
const api = require('./api');

loadSample(router);
api(router);

module.exports = router;