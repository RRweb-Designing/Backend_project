const express = require('express');
const Item = require('../models/Item');
const { authenticate, authorizeAdmin } = require('./auth');
const router = express.Router();

// Create Item
router.post('/items', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Read Items
router.get('/items', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update Item
router.put('/items/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Item
router.delete('/items/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.send('Item deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Dashboard (Basic example)
router.get('/dashboard', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const itemCount = await Item.countDocuments();
    res.send({ itemCount });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
