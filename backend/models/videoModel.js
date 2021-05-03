
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String,
  desc: String,
  data: Object,
  developer: { type: mongoose.Types.ObjectId, ref: 'Developers' },
  created: String,
  category: String,
  thumb: String,
  file: String,
  upvotes: Number,
  comments: Array,
  views: Number,

})


const model = mongoose.model('Videos', schema);

module.exports = model;