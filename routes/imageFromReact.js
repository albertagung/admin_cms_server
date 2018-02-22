const express = require('express')
const router = express.Router()
const imageFromReactController = require('../controllers/imageFromReactController')

// Find all image
router.get('/', imageFromReactController.findAllImages)

// Find image by image title
router.get('/:imageTitle', imageFromReactController.findImageByImageTitle)

module.exports = router
