const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')

// Uploading image data to DB
const imageFromReactController = require('../controllers/imageFromReactController')

// Amazon s3 config
AWS.config.loadFromPath('./s3_config.json')
let s3 = new AWS.S3()

const router = new express.Router();

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
})

// Uploading image into AWS S3 using multer
router.post('/upload', upload.single('field_name'), (req, res) => {
  // Parse the imageData to JSON
  let imageData = JSON.parse(req.body.imageData)
  // req.file is the 'field_name' file
  let fileData = {
    Bucket: process.env.BUCKET_NAME,
    Key: `image-${uuidv4()}`,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }
  s3.putObject(fileData, (err) => {
      if (err) {
        console.log(err)
        return res.status(400).send(err);
      } else {
        let objImageToDB = {
          'imageTitle': imageData.bannerTitle,
          'imageKey': fileData.Key
        }
        imageFromReactController.insertImageData(objImageToDB).then((dataObj) => {
          res.status(200).send(dataObj);
        })
      }
    })
})

module.exports = router
