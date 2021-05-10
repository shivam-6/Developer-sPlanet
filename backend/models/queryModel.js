
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String,
  query: String,
  data: Object,
  developer: { type: mongoose.Types.ObjectId, ref: 'developers' },
  created: Date,

})


const model = mongoose.model('queries', schema);

module.exports = model;