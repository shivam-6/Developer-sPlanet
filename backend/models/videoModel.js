
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String,
  desc: String,
  data: Object,
  developer: { type: mongoose.Types.ObjectId, ref: 'Users' },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
  created: String,
  category: String,
  thumb: String,
  file: String,
  upvotes: Number,
  views: Number,

})


const model = mongoose.model('Videos', schema);

module.exports = model;