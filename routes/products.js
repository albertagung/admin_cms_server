const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// Find all products
router.get('/', productController.findAllProducts)

// Create new product
router.post('/', productController.insertNewProduct)

// Update product by id
router.put('/:idProduct', productController.editProductById)

// Delete product by id
router.delete('/:idProduct', productController.deleteProductById)

module.exports = router
