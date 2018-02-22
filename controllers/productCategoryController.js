const ProductCategory = require('../models/productCategoryModel')

// Find all product category
const findAllCategories = (req, res) => {
  ProductCategory.find().then((dataCategories) => {
    res.status(200).send(dataCategories)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Create new category
const insertNewCategory = (req, res) => {
  let newProductCategory = ProductCategory(
    {
      text: req.body.text,
      value: req.body.value
    }
  )
  newProductCategory.save().then((dataCategory) => {
    res.status(200).send(dataCategory)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Delete category by id
const deleteCategoryById = (req, res) => {
  ProductCategory.findOneAndRemove(
    {
      _id: req.params.idCategory
    }
  )
  .then((dataCategory) => {
    res.status(200).send(dataCategory)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

module.exports = {
  findAllCategories,
  insertNewCategory,
  deleteCategoryById
}
