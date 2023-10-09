const express = require('express')
const router = express.Router()
const {
    createPin,
    getAllPins,
    getPinByPin,
    updatePin,
    deletePin,
} = require('../controllers/pin')


router.post('/pin',createPin)
router.put('/pin',updatePin)
router.get('/pin',getAllPins)
router.get('/pin/:pin',getPinByPin)
router.delete('/pin/:pin',deletePin)

module.exports = router