const express = require('express')
const router = express.Router()
const productCategoryController = require('../controllers/productCategoryController')

// Find all product categories
router.get('/', productCategoryController.findAllCategories)

// Create new product category
router.post('/', productCategoryController.insertNewCategory)

// Delete product category by id
router.delete('/:idPost', productCategoryController.deleteCategoryById)

module.exports = router
