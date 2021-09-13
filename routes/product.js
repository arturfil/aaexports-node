const express = require('express');
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
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
  const singleProduct = await Product.findById(id).populate("category", "name");
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

// POST imageUpload
router.post('/product/imageUpload/:id', async (req, res) => {
  const { id } = req.params;
  const productToUpdate = await Product.findById(id);

  // if it has an image, delete current and update new
  if (productToUpdate.img) {
    let array = productToUpdate.img.split('/');
    let fileName = array[array.length-1];
    const [public_id] = fileName.split('.');
    await cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.image;
  
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
  productToUpdate.img = secure_url;
  await productToUpdate.save();
  try {
    return res.status(201).json(productToUpdate);
  } catch (error) {
    return res.status(500).json({message: "There was an erro uploading the image"})
  }
})

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