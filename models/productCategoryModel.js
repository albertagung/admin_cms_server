const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productCategorySchema = Schema(
  {
    text: String,
    value: String
  }
)

let ProductCategory = mongoose.model('ProductCategory', productCategorySchema)
module.exports = ProductCategory
