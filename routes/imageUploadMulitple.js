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
  limits: {
    fileSize: 52428800
  },
})

// Uploading images into AWS S3 using multer
router.post('/upload', upload.array('field_name'), (req, res) => {
  // Parse the imageData to JSON
  let imageData = JSON.parse(req.body.imageData)
  // req.files is the 'field_name' file
  req.files.forEach( async (dataFiles) => {
    let fileData = {
      Bucket: process.env.BUCKET_NAME,
      Key: `image-${uuidv4()}`,
      Body: dataFiles.buffer,
      ACL: 'public-read', // your permisions
    }
    await s3.putObject(fileData, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
    })
    let objImageToDB = {
      'imageTitle': imageData,
      'imageKey': fileData.Key
    }
    imageFromReactController.insertImageData(objImageToDB).then((dataObj) => {
      console.log(dataObj)
    })
  })
  res.status(200).send('successfully store the image data')
})

module.exports = router