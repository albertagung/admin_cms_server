const mongoose = require('mongoose')
const Schema = mongoose.Schema

// UUID
const uuidv4 = require('uuid/v4')

const productSchema = Schema(
  {
    name: String,
    skuNumber: {type: String, default: 'None'},
    category: {type: String, default: 'No Product Category'},
    description: {type: String, default: 'No Description'},
    price: {type: Number, default: 0},
    taxApply: {type: Number, default: 0},
    weight: {type: Number, default: 0},
    type: {type: String, default: 'No Product Type'},
    stock: {type: Number, default: 0},
    stockType: {type: String, default: 'Available'},
    stockAlert: {type: Number, default: 0},
    productPackaging: {type: String, default: 'No Packaging'},
    shippingMethod: {type: String, default: 'TIKI'},
    images: {type: Array, default: []},
    variant: {
      type: Array,
      default: [
        {
          optionId: uuidv4(),
          optionName: '',
          optionValue: '',
          optionType: ''
        }
      ]
    },
    createdAt: {
      type: Date,
      default: Date.Now
    },
    updatedAt: {
      type: Date,
      default: Date.Now
    }
  }
)

let Product = mongoose.model('Product', productSchema)
module.exports = Product
