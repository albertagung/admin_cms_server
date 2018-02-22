const ProductType = require('../models/productTypeModel')

// Find all product type
const findAllTypes = (req, res) => {
  ProductType.find().then((dataTypes) => {
    res.status(200).send(dataTypes)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Create new type
const insertNewType = (req, res) => {
  let newProductType = ProductType(
    {
      text: req.body.text,
      value: req.body.value
    }
  )
  newProductType.save().then((dataType) => {
    res.status(200).send(dataType)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Delete type by id
const deleteTypeById = (req, res) => {
  ProductType.findOneAndRemove(
    {
      _id: req.params.idType
    }
  )
  .then((dataType) => {
    res.status(200).send(dataType)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

module.exports = {
  findAllTypes,
  insertNewType,
  deleteTypeById
}
