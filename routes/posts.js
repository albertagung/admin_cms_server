const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController.js')

// Find all posts
router.get('/', postController.findAllPost)

// Find post by id
router.get('/:idPost', postController.findPostById)

// Create new post
router.post('/', postController.insertNewPost)

// Update post by id
router.put('/:idPost', postController.updatePost)

// Delete post by id
router.delete('/:idPost', postController.removePost)

module.exports = router
