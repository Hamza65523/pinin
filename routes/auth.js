const express = require('express')
const router = express.Router()
const {Signup,ResetPassword,Signin,NewPassword,verifyUser} = require('../controllers/auth')


router.post('/signup',Signup)
router.post('/signin',Signin)
router.post('/reset-password',ResetPassword)
router.post('/new-password',NewPassword)
router.post('/verify-user',verifyUser)

module.exports = router