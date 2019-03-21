const mongoose = require('mongoose')

const flatSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, lowercase: true},
  price: {type: String, lowercase: true},
  rooms: String,
  size: String,
  address: String,
  link: String,
  time: { type : Date, default: Date.now }
});


module.exports = mongoose.model('flatSchema', flatSchema);