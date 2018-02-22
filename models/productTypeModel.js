const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productTypeSchema = Schema(
  {
    text: String,
    value: String
  }
)

let ProductType = mongoose.model('ProductType', productTypeSchema)
module.exports = ProductType
