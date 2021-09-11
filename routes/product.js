const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const products = await Product.find().populate("category","name");
  try {
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({message: "Error couldn't get the prodcuts"});
  }
})

// GET SingleProduct
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  const singleProduct = await Product.findById(id);
  try {
    return res.status(200).json(singleProduct);
  } catch (error) {
    return res.status(500).json({message: "Couldn't not get the product"});
  }
})

// POST Product
router.post('/product', async (req, res) => {
  const productToCreate = await Product.create(req.body);
  try {
    return res.status(201).json(productToCreate);
  } catch (error) {
    return res.status(500).json({message: "Could not create the product"})
  }
});

// PUT Product
router.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  const productToUpdate = await Product.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(productToUpdate);
  } catch (error) {
    return res.status(500).json({message: "Couldn't update product, check the server"});
  }
})

// DELETE Product
router.delete('/product/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  try {
    return res.json({message: "Product successfully deleted"});
  } catch (error) {
    return res.status(500).json({message: "ERROR could not delete product"});
  }
})

module.exports = router;