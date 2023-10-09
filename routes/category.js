const express = require('express')
const router = express.Router()
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/category')


router.post('/category',createCategory)
router.get('/category',getAllCategories)
router.get('/category/:id',getCategoryById)
router.put('/update-category',updateCategory)
router.delete('/delete-category',deleteCategory)

module.exports = router