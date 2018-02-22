const Product = require('../models/productModel')

// Find all products
const findAllProducts = (req, res) => {
  Product.find().then((dataProducts) => {
    res.status(200).send(dataProducts)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Insert new product
const insertNewProduct = (req, res) => {
  let newProduct = Product(
    {
      name: req.body.name,
      skuNumber: req.body.skuNumber,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      taxApply: req.body.taxApply,
      weight: req.body.weight,
      type: req.body.type,
      stock: req.body.stock,
      stockType: req.body.stockType,
      stockAlert: req.body.stockAlert,
      productPackaging: req.body.productPackaging,
      shippingMethod: req.body.shippingMethod,
      variant: req.body.variant,
      images: req.body.images,
      createdAt: new Date()
    }
  )
  newProduct.save().then((dataProduct) => {
    res.status(200).send(dataProduct)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Edit product by id
const editProductById = (req, res) => {
  Product.findOneAndUpdate(
    {
      _id: req.params.idProduct
    },
    {
      name: req.body.name,
      skuNumber: req.body.skuNumber,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      taxApply: req.body.taxApply,
      weight: req.body.weight,
      type: req.body.type,
      stock: req.body.stock,
      stockType: req.body.stockType,
      stockAlert: req.body.stockAlert,
      productPackaging: req.body.productPackaging,
      shippingMethod: req.body.shippingMethod,
      variant: req.body.variant,
      images: req.body.images,
      updatedAt: new Date()
    }
  )
  .then((dataProduct) => {
    res.status(200).send(dataProduct)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Delete product by id
const deleteProductById = (req, res) => {
  Product.findOneAndRemove(
    {
      _id: req.params.idProduct
    }
  )
  .then((dataProduct) => {
    res.status(200).send(dataProduct)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

module.exports = {
  findAllProducts,
  insertNewProduct,
  editProductById,
  deleteProductById
}
