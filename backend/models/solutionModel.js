
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String,
  data: Object,
  developer: { type: mongoose.Types.ObjectId, ref: 'Developers' },
  upvotes: Number,
  comments: Array,
  video: { type: mongoose.Types.ObjectId, ref: 'Videos' },
  created: Date,
})


const model = mongoose.model('solutions', schema);

module.exports = model;