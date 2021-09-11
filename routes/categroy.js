const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const categories = await Category.find();
  try {
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({message: "Could not get the categories"})
  }
})

// GET single
router.get('/category/:id', async (req, res) => {
  const { id } = req.params;
  const singleCategory = await Category.findById(id);
  try {
    return res.status(200).json(singleCategory);
  } catch (error) {
    return res.status(500).json({message: "Couldn't find Category, server error"});
  }
})

// POST category
router.post('/category', async (req, res) => {
  const categoryToCreate = await Category.create({
    name: req.body.name
  });

  try {
    return res.status(201).json(categoryToCreate);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the Category"});
  }
})

// PUT category
router.put('/category/:id', async (req, res) => {
  const {id} = req.params;
  const categoryToUpdate = await Category.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(categoryToUpdate);
  } catch (error) {
    return res.status(500).json("Error, couldn't update the category");
  }
})

// DELETE categroy
router.delete('/category/:id', async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  try {
    return res.json({message: 'Category successfully Deleted'})
  } catch (error) {
    return res.status(500).json({message: 'Category was not deleted, check server'})
  }
})

module.exports = router;