
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String,
  query: String,
  data: Object,
  upvotes: Number,
  solutions: [{ type: mongoose.Types.ObjectId, ref: 'solutions' }],
  developer: { type: mongoose.Types.ObjectId, ref: 'Users' },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
  created: Date,
  

})


const model = mongoose.model('queries', schema);

module.exports = model;