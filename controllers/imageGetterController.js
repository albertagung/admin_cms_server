const AWS = require('aws-sdk')

// Amazon s3 config
AWS.config.loadFromPath('./s3_config.json')
let s3 = new AWS.S3()

// Get one image
const getImage = (req, res) => {
  let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.params.keyName
  }
  s3.getSignedUrl('getObject', params, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
}

// Get many images
const getImages = (bucketName) => {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: bucketName
    }
    // Doing async function
    s3.listObjects(params, async (err, data) => {
      if (err) {
        console.log(err)
      } else {
        let bucketContents = data.Contents
        let objUrl = []
        let obj = {}
        // Wait the forEach to complete filling objUrl
        await bucketContents.forEach((contents) => {
          let urlParams = {
            Bucket: bucketName,
            Key: contents.Key
          }
          s3.getSignedUrl('getObject', urlParams, (err, url) => {
            if (err) {
              console.log(err)
              reject(err)
            } else {
              obj = {
                'imgKey': contents.Key,
                'imgSize': contents.Size,
                'url': url
              }
              objUrl.push(obj)
            }
          })
        })
        // Once complete, sending the objUrl to the API
        resolve(objUrl)
      }
    })
  })
}

module.exports = {
  getImage,
  getImages
}
