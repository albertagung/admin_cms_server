const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = Schema(
  {
    imageTitle: String,
    imageKey: String
  }
)

let Image = mongoose.model('Image', imageSchema)
module.exports = Image
