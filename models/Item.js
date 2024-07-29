const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ body: String, date: Date }],
  ratings: [{ user: String, rating: Number }],
});

module.exports = mongoose.model('Item', ItemSchema);
