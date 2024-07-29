const express = require('express');
const Item = require('../models/Item');
const { authenticate } = require('./auth');
const router = express.Router();

// View Items
router.get('/items', authenticate, async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// View Item Details
router.get('/items/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Add Comment
router.post('/items/:id/comments', authenticate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    item.comments.push({ body: req.body.comment, date: new Date() });
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Add Rating
router.post('/items/:id/ratings', authenticate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    item.ratings.push({ user: req.user.userId, rating: req.body.rating });
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
