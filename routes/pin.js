const express = require('express')
const router = express.Router()
const {GeneratePin} = require('../controllers/pin')


router.post('/pin',GeneratePin)
module.exports = router