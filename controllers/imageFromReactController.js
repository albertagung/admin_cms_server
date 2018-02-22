const Image = require('../models/imageModel')
const imageGetterController = require('./imageGetterController')

// Find all images
let findAllImages = (req, res) => {
  imageGetterController.getImages(process.env.BUCKET_NAME).then((dataFromBucket) => {
    Image.find().then((dataFromDB) => {
      let arrResult = []
      dataFromBucket.forEach((eachDataFromBucket) => {
        dataFromDB.forEach((eachDataFromDB) => {
          if (eachDataFromBucket.imgKey === eachDataFromDB.imageKey) {
            let objMatch = {
              'imageKey': eachDataFromDB.imageKey,
              'imageTitle': eachDataFromDB.imageTitle,
              'imageSize': eachDataFromBucket.imgSize,
              'url': eachDataFromBucket.url
            }
            arrResult.push(objMatch)
          }
        })
      })
      res.status(200).send(arrResult)
    }).catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
  })
}

// Find image by image title
let findImageByImageTitle = (req, res) => {
  imageGetterController.getImages(process.env.BUCKET_NAME).then((dataFromBucket) => {
    Image.find({
      imageTitle: req.params.imageTitle
    }).then((dataFromDB) => {
      let arrObjMatch = []
      dataFromBucket.forEach((eachDataFromBucket) => {
        dataFromDB.forEach((eachDataFromDB) => {
          if (eachDataFromBucket.imgKey === eachDataFromDB.imageKey) {
            let objMatch = {
              'imageKey': eachDataFromDB.imageKey,
              'imageTitle': eachDataFromDB.imageTitle,
              'imageSize': eachDataFromBucket.imgSize,
              'url': eachDataFromBucket.url
            }
            arrObjMatch.push(objMatch)
          }
        })
      })
      res.status(200).send(arrObjMatch)      
    }).catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
  })
}

// Insert new image data
let insertImageData = (objImageData) => {
  return new Promise((resolve, reject) => {
    let newImageData = Image(objImageData)
    newImageData.save().then((dataImage) => {
        resolve(dataImage)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = {
  findAllImages,
  findImageByImageTitle,
  insertImageData
}