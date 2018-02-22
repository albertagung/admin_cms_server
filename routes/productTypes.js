const express = require('express')
const router = express.Router()
const productTypeController = require('../controllers/productTypeController')

// Find all product types
router.get('/', productTypeController.findAllTypes)

// Create new product type
router.post('/', productTypeController.insertNewType)

// Delete product type by id
router.delete('/:idPost', productTypeController.deleteTypeById)

module.exports = router
