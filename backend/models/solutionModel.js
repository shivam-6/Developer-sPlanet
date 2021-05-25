
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String,
  data: Object,
  developer: { type: mongoose.Types.ObjectId, ref: 'users' },
  upvotes: Array,
  video: { type: mongoose.Types.ObjectId, ref: 'Videos' },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
  created: Date,
})


const model = mongoose.model('solutions', schema);

module.exports = model;